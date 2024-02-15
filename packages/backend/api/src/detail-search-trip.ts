// import type { Request, Response } from 'express';
import express from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

type DetailTrip = {
  cp_t_id: bigint;
  start_address: string;
  end_address: string;
  cp_t_kilometer: number;
  cp_t_travel_time: number;
  t_id: bigint;
  driver_id: number;
  car_id: number;
  date: Date;
  price: number;
  comment?: string;
  seat_available: number;
  should_auto_validate: boolean;
  is_animal_allowed: boolean;
  is_baby_allowed: boolean;
  is_smoker_allowed: boolean;
  is_non_vaccinated_allowed: boolean;
  firstname: string;
  lastname: string;
  avatar?: string;
  driverCar: {
    id: bigint;
    photo: string;
    number_seat: number;
    color: string;
    plate_number: string;
    user_id: number;
    car_type_id: number;
  };
  passengerCheckpointTrip: {
    id: bigint;
    reserved_seat: number;
    checkpoint_trip_id: number;
    reservation_id: null | number;
  }[];
};

const searchTripByIdRouter = express.Router();

searchTripByIdRouter.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const checkpointTrip = await db
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
        'car_id',
        'trip.date',
        'trip.price',
        'comment',
        'trip.seat_available',
        'should_auto_validate',
        'is_animal_allowed',
        'is_baby_allowed',
        'is_smoker_allowed',
        'is_non_vaccinated_allowed',
        'driver_id',
        'firstname',
        'lastname',
        'avatar',
      ])
      .where('checkpoint_trip.id', '=', BigInt(id))
      .where(sql`date > CURRENT_TIMESTAMP`)
      .executeTakeFirst();

    if (checkpointTrip === undefined) {
      return new Error('error checkpoint');
    }

    const driverCar = await db
      .selectFrom('car')
      .selectAll()
      .where('car.id', '=', BigInt(checkpointTrip.car_id))
      .executeTakeFirst();

    if (driverCar === undefined) {
      return new Error('error driver car');
    }

    const passengerCheckpointTrip = await db
      .selectFrom('reservation_seat')
      .selectAll()
      .where('checkpoint_trip_id', '=', Number(checkpointTrip.cp_t_id))
      .execute();

    const detailSearchTrip: DetailTrip = {
      ...checkpointTrip,
      driverCar,
      passengerCheckpointTrip,
    };

    return res.json(detailSearchTrip);
  } catch (error) {
    return res.json({
      ok: false,
      error,
    });
  }
});

export { searchTripByIdRouter };
