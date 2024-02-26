// import type { Request, Response } from 'express';
import express from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';
import type { DataSearchTrip } from '@app/types';

type Search = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  passenger: number;
  date: Date;
};

// type SearchTrip = {
//   cp_t_id: bigint;
//   start_address: string;
//   end_address: string;
//   cp_t_kilometer: number;
//   cp_t_travel_time: number;
//   t_id: bigint;
//   driver_id: number;
//   date: Date;
//   price: number;
//   seat_available: number;
//   firstname: string;
//   lastname: string;
//   avatar?: string;
//   start_distance: number;
//   end_distance: number;
//   passengerSearchTrip: {
//     id: bigint;
//     reserved_seat: number;
//     checkpoint_trip_id: number;
//     reservation_id: null | number;
//   }[];
// };

const searchTripRouter = express.Router();

searchTripRouter.get('/', async (req, res) => {
  const searchTripFilter: DataSearchTrip[] = [];
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
    const searchTrips = await db
      .selectFrom('checkpoint_trip')
      .innerJoin('trip', 'checkpoint_trip.trip_id', 'trip.id')
      .innerJoin('user', 'trip.driver_id', 'user.id')
      .select([
        'checkpoint_trip.id as cp_t_id',
        'start_address',
        'end_address',
        'checkpoint_trip.kilometer as cp_t_kilometer',
        'checkpoint_trip.travel_time as cp_t_travel_time',
        'trip.id as t_id',
        'date',
        'price',
        'seat_available',
        'driver_id',
        'firstname',
        'lastname',
        'avatar',
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

    for await (const searchTrip of searchTrips) {
      const id = Number(searchTrip.cp_t_id);

      const passengerSearchTrip = await db
        .selectFrom('reservation_seat')
        .selectAll()
        .where('checkpoint_trip_id', '=', id)
        .execute();
      if (passengerSearchTrip.length >= passenger) {
        searchTripFilter.push({ ...searchTrip, passengerSearchTrip });
      }
    }

    return res.json(searchTripFilter);
  } catch (error) {
    return res.json({
      ok: false,
      error,
    });
  }
});

export { searchTripRouter };
