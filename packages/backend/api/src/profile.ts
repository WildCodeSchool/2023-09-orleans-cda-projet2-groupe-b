import express from 'express';
import { sql } from 'kysely';
import { db } from '@app/backend-shared';

const userRouter = express.Router();

userRouter.get('/:userId', async (req, res) => {
  const userId = Number.parseInt(req.params.userId);
  try {
    const user = await db
      .selectFrom('user')
      .select([
        'id',
        'firstname',
        'lastname',
        'birthdate',
        'created_at',
        'driver_kilometer_traveled',
        'passenger_kilometer_traveled',
        'avatar'
      ])
      .where(sql`id = ${userId}`)
      .execute();

    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { userRouter };
