// import type { Request, Response } from 'express';
import express from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

type Search = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  passenger: number;
  date: Date;
};

type SearchFilter = {
  start_address: string;
  end_address: string;
  date: Date;
  price: number;
  seat_available: number;
  kilometer: number;
  travel_time: number;
  t_id: bigint;
  c_t_id: bigint;
  t_kilometer: number;
  t_travel_time: number;
  start_distance: number;
  end_distance: number;
  passengerCheckpointTrip: {
    id: bigint;
    reserved_seat: number;
    checkpoint_trip_id: number;
    reservation_id: null | number;
  }[];
}[];

const searchTripRouter = express.Router();

searchTripRouter.get('/search-trip', async (req, res) => {
  const searchFilter: SearchFilter = [];
  const { startX, startY, endX, endY, passenger, date } =
    req.query as unknown as Search;

  const startDistance = sql`
    6371 * 1000 * ACOS(COS(RADIANS(ST_X(start_point))) * COS(RADIANS(${startX})) * COS(RADIANS(ST_Y(start_point)
      - ${startY})) + SIN(RADIANS(ST_X(start_point))) * SIN(RADIANS(${startX})))
  `;

  const endDistance = sql`
    6371 * 1000 * ACOS(COS(RADIANS(ST_X(end_point))) * COS(RADIANS(${endX})) * COS(RADIANS(ST_Y(end_point) - ${endY}))
      + SIN(RADIANS(ST_X(end_point))) * SIN(RADIANS(${endX})))
  `;

  try {
    const checkpointsTrip = await db
      .selectFrom('checkpoint_trip')
      .innerJoin('trip', 'checkpoint_trip.trip_id', 'trip.id')
      .select([
        'start_address',
        'end_address',
        'trip.id as t_id',
        'checkpoint_trip.id as c_t_id',
        'trip.kilometer as t_kilometer',
        'trip.travel_time as t_travel_time',
        'checkpoint_trip.kilometer',
        'checkpoint_trip.travel_time',
        'trip.price',
        'trip.seat_available',
        'trip.date',

        sql<number>`${startDistance}`.as('start_distance'),
        sql<number>`${endDistance}`.as('end_distance'),
      ])
      .where(sql`${startDistance} < 5000`)
      .where(sql`${endDistance} < 5000`)
      .where(sql`date > CURRENT_TIMESTAMP`)
      .where(
        sql`DATE_FORMAT(date,'%d/%m/%Y') = DATE_FORMAT(${date},'%d/%m/%Y')`,
      )
      .execute();

    for await (const checkpointTrip of checkpointsTrip) {
      const id = Number(checkpointTrip.c_t_id);

      const passengerCheckpointTrip = await db
        .selectFrom('reservation_seat')
        .select(['reserved_seat', 'checkpoint_trip_id', 'reservation_id', 'id'])
        .where('checkpoint_trip_id', '=', id)
        .execute();
      if (passengerCheckpointTrip.length >= passenger) {
        searchFilter.push({ ...checkpointTrip, passengerCheckpointTrip });
      }
    }

    return res.json(searchFilter);
  } catch (error) {
    return res.json({
      ok: false,
      error,
    });
  }
});

export { searchTripRouter };
