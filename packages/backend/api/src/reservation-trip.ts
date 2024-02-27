// import type { Request, Response } from 'express';
import express from 'express';
import type { Request } from 'express';
import { sql } from 'kysely';
import loginIdUser from 'middleware/user-id';

import { db } from '@app/backend-shared';

type Reservation = {
  shouldAutoValidate: boolean;
  seatSelectId: bigint[];
};

interface RequestWithUser extends Request {
  userId?: number;
}

const reservationTripRouter = express.Router();

reservationTripRouter.post(
  '/',
  loginIdUser,
  async (req: RequestWithUser, res) => {
    try {
      if (!req.userId) {
        throw new Error('User is not authenticated');
      }
      const userId = req.userId;

      const { shouldAutoValidate, seatSelectId } = req.body as Reservation;

      console.log('LLLAAAA', shouldAutoValidate, seatSelectId);

      const createdAt = new Date();

      let validatedAt: Date | undefined = new Date();
      if (!shouldAutoValidate) {
        validatedAt = undefined;
      }

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
      console.log('la');

      const insertReservation = await db
        .insertInto('reservation')
        .values({
          user_id: BigInt(userId),
          number_seat: seatSelectId.length,
          validated_at: validatedAt,
          created_at: createdAt,
        })
        .executeTakeFirst();
      console.log(insertReservation);
      console.log('laa');

      const reservationId = insertReservation.insertId;

      await db
        .updateTable('reservation_seat')
        .set({ reservation_id: reservationId })
        .where('id', 'in', seatSelectId)
        .execute();
      console.log('laaa');

      return res.json({
        ok: true,
      });
    } catch (error) {
      return res.json({
        ok: false,
        error,
      });
    }
  },
);

export { reservationTripRouter };
