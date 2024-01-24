import type { Request, Response } from 'express';
import express from 'express';
import loginIdUser from 'middleware/user-id';
import validationCar from 'middleware/validate-car';

import { db } from '@app/backend-shared';
import type { CarBody } from '@app/types';

const carRouter = express.Router();

interface RequestWithUser extends Request {
  userId?: number;
}

carRouter.get('/', loginIdUser, async (req: RequestWithUser, res: Response) => {
  try {
    if (!req.userId) {
      throw new Error('User is not authenticated');
    }
    const userId = req.userId;
    const car = await db
      .selectFrom('car')
      .innerJoin('car_type', 'car_type.id', 'car.car_type_id')
      .select([
        'car.id',
        'car_type.brand',
        'car_type.model',
        'car.color',
        'car.number_seat',
        'car.photo',
        'car.plate_number',
        'car.number_seat',
      ])
      .where('car.user_id', '=', userId)
      .execute();
    res.json(car);
  } catch {
    res.status(500).send('internalServerError');
  }
});

carRouter.post(
  '/add',
  loginIdUser,
  validationCar,
  async (req: RequestWithUser, res: Response) => {
    try {
      await db.transaction().execute(async (trx) => {
        const { brand, model, photo, number_seat, color, plate_number } =
          req.body as CarBody;

        const carType = await trx
          .insertInto('car_type')
          .values({
            brand,
            model,
          })
          .executeTakeFirstOrThrow();

        const carTypeId = carType.insertId;

        if (carTypeId === undefined) {
          throw new Error('carTypeId is undefined');
        }

        if (!req.userId) {
          throw new Error('User is not authenticated');
        }

        const userId = req.userId;

        await trx
          .insertInto('car')
          .values({
            photo,
            number_seat,
            color,
            plate_number,
            user_id: userId,
            car_type_id: Number(carTypeId),
          })
          .execute();
        return res.json({
          ok: true,
        });
      });
      res.status(200).send('success');
    } catch {
      res.status(500).send('internalServerError');
    }
  },
);

export { carRouter };
