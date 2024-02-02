import express from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';
import type {
  RequestBodyCheckpointType,
  RequestBodyTripType,
} from '@app/shared';

const publishTripRouter = express.Router();

publishTripRouter.post('/', async (req, res) => {
  const {
    driverId,
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
  try {
    const insertedTrip = await db
      .insertInto('trip')
      .values({
        driver_id: driverId,
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
