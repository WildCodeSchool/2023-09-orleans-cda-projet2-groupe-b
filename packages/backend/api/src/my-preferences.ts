import express from 'express';
import type { Request, Response } from 'express';
import loginIdUser from 'middleware/user-id';

import { db } from '@app/backend-shared';
import type { UserPreferencesBody } from '@app/types';

interface RequestWithUser extends Request {
  userId?: number;
}

const preferenceRouter = express.Router();

preferenceRouter.get(
  '/',
  loginIdUser,
  async (req: RequestWithUser, res: Response) => {
    try {
      if (!req.userId) {
        throw new Error('User is not authenticated');
      }
      const user = await db
        .selectFrom('user')
        .select([
          'biography',
          'is_baby_allowed',
          'is_non_vaccinated_allowed',
          'is_animal_allowed',
          'is_smoker_allowed',
          'selected_languages',
          'selected_musics',
        ])
        .where('id', '=', BigInt(req.userId))
        .execute();

      if (user.length === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json(user[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
);

preferenceRouter.put(
  '/',
  loginIdUser,
  async (req: RequestWithUser, res: Response) => {
    if (!req.userId) {
      throw new Error('User is not authenticated');
    }
    try {
      const {
        biography,
        is_baby_allowed,
        is_non_vaccinated_allowed,
        is_animal_allowed,
        is_smoker_allowed,
        selected_languages,
        selected_musics,
      } = req.body as UserPreferencesBody;

      await db
        .updateTable('user')
        .set({
          biography,
          is_baby_allowed,
          is_non_vaccinated_allowed,
          is_animal_allowed,
          is_smoker_allowed,
          selected_languages: JSON.stringify(selected_languages),
          selected_musics: JSON.stringify(selected_musics),
        })
        .where('user.id', '=', BigInt(req.userId))
        .execute();

      res.status(200).send({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).send('internalServerError');
    }
  },
);

export { preferenceRouter };
