import express from 'express';
import { Sql, sql } from 'kysely';

import { db } from '@app/backend-shared';
import type { SomeInterface } from '@app/types';

type Point = {
  x: number;
  y: number;
};

type reqBodyTrip = {
  driver_id: bigint;
  created_at: Date;
  date: Date;
  kilometer: number;
  travel_time: number;
  seat_available: number;
  price: number;
  should_auto_validate: boolean;
  comment?: string;
  is_baby_allowed: boolean;
  is_non_vaccinated_allowed: boolean;
  is_animal_allowed: boolean;
  is_smoker_allowed: boolean;
  has_tolls: boolean;
  car_id: bigint;
};
type reqBodyCheckpoint = {
  start_point: Point;
  end_point: Point;
  start_address: string;
  end_address: string;
  kilometer: number;
  travel_time: number;
  trip_id: bigint;
}[];

const publishTripRouter = express.Router();

publishTripRouter.get('/trips', async (req, res) => {
  const trips = await db.selectFrom('trip').selectAll().execute();
  return res.json(trips);
});
publishTripRouter.post('/publish-trip', async (req, res) => {
  const {
    driver_id,
    kilometer,
    travel_time,
    seat_available,
    price,
    comment,
    should_auto_validate,
    is_baby_allowed,
    is_non_vaccinated_allowed,
    is_animal_allowed,
    is_smoker_allowed,
    has_tolls,
    car_id,
  } = req.body as reqBodyTrip;

  const date = new Date(req.body.date);
  const created_at = new Date();
  try {
    const insertedTrip = await db
      .insertInto('trip')
      .values({
        driver_id,
        created_at,
        date,
        kilometer,
        travel_time,
        seat_available,
        price,
        comment,
        should_auto_validate,
        is_baby_allowed,
        is_non_vaccinated_allowed,
        is_animal_allowed,
        is_smoker_allowed,
        has_tolls,
        car_id,
      })
      .executeTakeFirst();
    console.log(insertedTrip.insertId);
    const trip_id = insertedTrip.insertId;
    const checkpoints: reqBodyCheckpoint = req.body.checkpoints;

    if (trip_id !== undefined) {
      const insertedChekpoints = await db
        .insertInto('checkpoint_trip')
        .values(
          checkpoints.map((checkpoint) => ({
            start_point: sql`POINT(${checkpoint.start_point.x},${checkpoint.start_point.y})`,
            end_point: sql`POINT(${checkpoint.end_point.x},${checkpoint.end_point.y})`,
            start_address: checkpoint.start_address,
            end_address: checkpoint.end_address,
            kilometer: checkpoint.kilometer,
            travel_time: checkpoint.travel_time,
            trip_id: trip_id,
          })),
        )
        .executeTakeFirst();
      const checkpointsId = await db
        .selectFrom('checkpoint_trip')
        .select('id')
        .where('trip_id', '=', trip_id)
        .execute();

      const reservation_seat: number[] = req.body.reservation_seat;
      console.log(reservation_seat);
      reservation_seat.map((seat) => { console.log('seat', seat); });
      checkpointsId.map((id) => { console.log('id', id.id); });

      const insertedReservationSeat = await db
        .insertInto('reservation_seat')
        .values(
          checkpointsId.flatMap((id) =>
            reservation_seat.map((seat) => ({
              reserved_seat: seat,
              checkpoint_trip_id: id.id,
            })),
          ),
        )
        .execute();
      for (const seat of insertedReservationSeat) {
        console.log(seat);
      }
    }
    return res.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      ok: false,
      error,
    });
  }
});

export { publishTripRouter };
