// import type { Request, Response } from 'express';
import express from 'express';
import { sql } from 'kysely';
import { getUser } from 'middleware/get-user';

import { db } from '@app/backend-shared';

type Reservation = {
  shouldAutoValidate: boolean;
  seatSelectId: bigint[];
};

const reservationTripRouter = express.Router();

reservationTripRouter.post('/', getUser, async (req, res) => {
  const user = res.locals.user;
  const { shouldAutoValidate, seatSelectId } = req.body as Reservation;

  console.log('LLLAAAA', shouldAutoValidate, seatSelectId);

  const createdAt = new Date();

  const validatedAt: Date | null = new Date();

  // if shouldAutoValidate false -> validated_at = null else new Date()

  try {
    const selectReservationSeat = await db
      .selectFrom('reservation_seat')
      .selectAll()
      .where('id', 'in', seatSelectId)
      .execute();

    const seatUnavailable = selectReservationSeat.find(
      (seat) => seat.reservation_id !== null,
    );

    if (seatUnavailable !== undefined) {
      console.log('Seat unavailable');

      return res.json({
        ok: false,
        error: 'Seat unavailable',
      });
    }

    const insertReservation = await db
      .insertInto('reservation')
      .values({
        user_id: Number(user.id),
        number_seat: seatSelectId.length,
        validated_at: createdAt,
        created_at: createdAt,
      })
      .executeTakeFirst();

    const reservationId = Number(insertReservation.insertId);

    const insertReservationSeat = await db
      .updateTable('reservation_seat')
      .set({ reservation_id: reservationId })
      .where('id', 'in', seatSelectId)
      .execute();

    for await (const id of insertReservationSeat) {
      console.log(id);
    }

    return res.json({
      ok: true,
      reservationId,
    });
  } catch (error) {
    return res.json({
      ok: false,
      error,
    });
  }
});

export { reservationTripRouter };
