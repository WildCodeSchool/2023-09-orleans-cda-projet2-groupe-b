import express from 'express';
import type { Request } from 'express';
import { sql } from 'kysely';
import loginIdUser from 'middleware/user-id';

import { db } from '@app/backend-shared';
import type {
  RequestBodyCheckpointType,
  RequestBodyTripType,
} from '@app/shared';

const publishTripRouter = express.Router();

interface RequestWithUser extends Request {
  userId?: number;
}

publishTripRouter.get(
  '/car',
  loginIdUser,
  async (req: RequestWithUser, res) => {
    try {
      if (!req.userId) {
        throw new Error('User is not authenticated');
      }
      const userId = req.userId;

      const cars = await db
        .selectFrom('car')
        .selectAll()
        .where('car.user_id', '=', userId)
        .execute();
      return res.json(cars);
    } catch (error) {
      return res.json({
        ok: false,
        error,
      });
    }
  },
);

publishTripRouter.post('/', loginIdUser, async (req: RequestWithUser, res) => {
  try {
    if (!req.userId) {
      throw new Error('User is not authenticated');
    }
    const userId = req.userId;

    const {
      kilometer,
      travelTime,
      seatAvailable,
      price,
      comment,
      shouldAutoValidate,
      isBabyAllowed,
      isNonVaccinatedAllowed,
      isAnimalAllowed,
      isSmokerAllowed,
      hasTolls,
      carId,
    } = req.body as RequestBodyTripType;

    const date = new Date(req.body.date);
    const createdAt = new Date();

    const insertedTrip = await db
      .insertInto('trip')
      .values({
        driver_id: BigInt(userId),
        created_at: createdAt,
        date,
        kilometer,
        travel_time: travelTime,
        seat_available: seatAvailable,
        price,
        comment,
        should_auto_validate: shouldAutoValidate,
        is_baby_allowed: isBabyAllowed,
        is_non_vaccinated_allowed: isNonVaccinatedAllowed,
        is_animal_allowed: isAnimalAllowed,
        is_smoker_allowed: isSmokerAllowed,
        has_tolls: hasTolls,
        car_id: BigInt(carId),
      })
      .executeTakeFirst();
    const tripId = insertedTrip.insertId;
    const checkpoints: RequestBodyCheckpointType = req.body.checkpoints;

    if (tripId !== undefined) {
      await db
        .insertInto('checkpoint_trip')
        .values(
          checkpoints.map((checkpoint) => ({
            start_point: sql`POINT(${checkpoint.startPoint.x},${checkpoint.startPoint.y})`,
            end_point: sql`POINT(${checkpoint.endPoint.x},${checkpoint.endPoint.y})`,
            start_address: checkpoint.startAddress,
            end_address: checkpoint.endAddress,
            kilometer: checkpoint.kilometer,
            travel_time: checkpoint.travelTime,
            trip_id: tripId,
          })),
        )
        .executeTakeFirst();
      const checkpointsId = await db
        .selectFrom('checkpoint_trip')
        .select('id')
        .where('trip_id', '=', tripId)
        .execute();

      const reservationSeat: number[] = req.body.reservationSeat;

      await db
        .insertInto('reservation_seat')
        .values(
          checkpointsId.flatMap((id) =>
            reservationSeat.map((seat) => ({
              reserved_seat: seat,
              checkpoint_trip_id: id.id,
            })),
          ),
        )
        .execute();
    }
    return res.json({
      ok: true,
    });
  } catch (error) {
    return res.json({
      ok: false,
      error,
    });
  }
});

export { publishTripRouter };
