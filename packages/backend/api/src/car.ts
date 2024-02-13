import type { Request, Response } from 'express';
import express from 'express';
import loginIdUser from 'middleware/user-id';
import validationCar from 'middleware/validate-car';

import { db } from '@app/backend-shared';
import type { Car } from '@app/types';

const carRouter = express.Router();

interface RequestWithUser extends Request {
  userId?: number;
}

carRouter.post(
  '/add',
  loginIdUser,
  validationCar,
  async (req: RequestWithUser, res: Response) => {
    try {
      await db.transaction().execute(async (trx) => {
        const { brand, model, photo, number_seat, color, plate_number } =
          req.body as Car;

        if (!req.userId) {
          throw new Error('User is not authenticated');
        }

        const userId = req.userId;

        await trx
          .insertInto('car')
          .values({
            brand,
            model,
            photo,
            number_seat,
            color,
            plate_number,
            user_id: userId,
          })
          .execute();
      });
      res.status(200).json({ ok: true, message: 'success' });
    } catch (error) {
      return res.status(500).json({ ok: false, error });
    }
  },
);

carRouter.get('/', loginIdUser, async (req: RequestWithUser, res: Response) => {
  try {
    if (!req.userId) {
      throw new Error('User is not authenticated');
    }
    const userId = req.userId;
    const car = await db
      .selectFrom('car')
      .selectAll()
      .where('car.user_id', '=', userId)
      .execute();
    res.json(car);
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: 'error with the request', error });
  }
});

carRouter.get('/:id', loginIdUser, async (req: Request, res: Response) => {
  const { id } = req.params;

  const currentData = await db
    .selectFrom('car')
    .selectAll()
    .where('car.id', '=', BigInt(id))
    .execute();
  res.json(currentData[0]);
});

carRouter.put(
  '/:id',
  loginIdUser,
  async (req: RequestWithUser, res: Response) => {
    try {
      const { id } = req.params;
      const userId = req.userId;
      const { brand, model, photo, number_seat, color, plate_number } =
        req.body as Car;
      await db.transaction().execute(async (trx) => {
        const car = await trx
          .selectFrom('car')
          .select('user_id')
          .where('id', '=', BigInt(id))
          .executeTakeFirst();

        if (!car) {
          return res.status(404).json({ ok: false, message: 'Car not found' });
        }

        if (car.user_id !== userId) {
          return res.status(403).json({ ok: false, message: 'Not authorized' });
        }

        await trx
          .updateTable('car')
          .set({
            brand,
            model,
            photo,
            number_seat,
            color,
            plate_number,
          })
          .where('id', '=', BigInt(id))
          .execute();
        return res.json({
          ok: true,
        });
      });
      res.status(200).json('Car Updated');
    } catch (error) {
      return res.status(500).json({ ok: false, error });
    }
  },
);

carRouter.delete(
  '/:id',
  loginIdUser,
  async (req: RequestWithUser, res: Response) => {
    try {
      const { id } = req.params;
      const userId = req.userId;
      await db.transaction().execute(async (trx) => {
        const car = await trx
          .selectFrom('car')
          .select('user_id')
          .where('id', '=', BigInt(id))
          .executeTakeFirst();

        if (!car) {
          return res.status(404).json({ ok: false, message: 'Car not found' });
        }

        if (car.user_id !== userId) {
          return res.status(403).json({ ok: false, message: 'Not authorized' });
        }

        await trx
          .deleteFrom('car')
          .where('id', '=', BigInt(id))
          .executeTakeFirst();
      });

      res.status(200).json({ ok: true, message: 'Car Deleted' });
    } catch (error) {
      return res.status(500).json({ ok: false, error });
    }
  },
);

export { carRouter };
