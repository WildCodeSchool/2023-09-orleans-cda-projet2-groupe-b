import express from 'express';
import type { Request, Response } from 'express';
import loginIdUser from 'middleware/user-id';

import { db } from '@app/backend-shared';

interface RequestWithUser extends Request {
  userId?: number;
}

const infoRouter = express.Router();

infoRouter.get(
  '/',
  loginIdUser,
  async (req: RequestWithUser, res: Response) => {
    try {
      if (!req.userId) {
        throw new Error('User is not authenticated');
      }
      const user = await db
        .selectFrom('user')
        .select(['id', 'firstname', 'lastname', 'email', 'birthdate'])
        .where('id', '=', BigInt(req.userId))
        .execute();

      if (user.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
);

export { infoRouter };
