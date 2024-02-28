// import type { Request, Response } from 'express';
import express from 'express';
import { sql } from 'kysely';
import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';

const searchTripDetailsRouter = express.Router();

searchTripDetailsRouter.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const searchTripDetails = await db
      .selectFrom('checkpoint_trip as cp_t')
      .select((eb) => [
        'cp_t.id',
        'cp_t.trip_id',
        'cp_t.start_address',
        'cp_t.end_address',
        'cp_t.kilometer',
        'cp_t.travel_time',
        jsonObjectFrom(
          eb
            .selectFrom('trip as t')
            .select((eb) => [
              't.id',
              't.driver_id',
              't.date',
              't.kilometer',
              't.travel_time',
              't.seat_available',
              't.price',
              't.comment',
              't.car_id',
              't.has_tolls',
              't.should_auto_validate',
              't.is_animal_allowed',
              't.is_baby_allowed',
              't.is_smoker_allowed',
              'is_non_vaccinated_allowed',
              jsonArrayFrom(
                eb
                  .selectFrom('checkpoint_trip as cp_tt')
                  .select([
                    'cp_tt.id',
                    'cp_tt.trip_id',
                    'cp_tt.start_address',
                    'cp_tt.end_address',
                    'cp_tt.kilometer',
                    'cp_tt.travel_time',
                  ])
                  .whereRef('cp_tt.trip_id', '=', 't.id'),
              ).as('checkpoints'),
              jsonObjectFrom(
                eb
                  .selectFrom('user as u')
                  .select(['u.id', 'u.firstname', 'u.lastname', 'u.avatar'])
                  .whereRef('u.id', '=', 't.driver_id'),
              ).as('driver'),
              jsonObjectFrom(
                eb
                  .selectFrom('car as c')
                  .select([
                    'c.id',
                    'c.brand',
                    'c.model',
                    'c.photo',
                    'c.plate_number',
                    'c.number_seat',
                    'c.color',
                  ])
                  .whereRef('c.id', '=', 't.car_id'),
              ).as('car'),
            ])
            .whereRef('t.id', '=', 'cp_t.trip_id'),
        ).as('trip'),
        jsonArrayFrom(
          eb
            .selectFrom('reservation_seat as r_s')
            .select([
              'r_s.id',
              'r_s.reserved_seat',
              'r_s.checkpoint_trip_id',
              'r_s.reservation_id',
            ])
            .whereRef('r_s.checkpoint_trip_id', '=', 'cp_t.id'),
        ).as('reservations'),
      ])
      .where('cp_t.id', '=', BigInt(id))
      .executeTakeFirst();

    return res.json(searchTripDetails);
  } catch (error) {
    return res.json({
      ok: false,
      error,
    });
  }
});

export { searchTripDetailsRouter };
