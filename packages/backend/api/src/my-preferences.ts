import express from 'express';
import { db } from '@app/backend-shared';
import { sql } from 'kysely';
import type { UserPreferencesBody } from '@app/types';

const preferenceRouter = express.Router();

preferenceRouter.get('/:userId', async (req, res) => {
  const userId = Number.parseInt(req.params.userId);
  try {
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
      .where(sql`id = ${userId}`)
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
});

preferenceRouter.put('/:userId', async (req, res) => {
  const userId = BigInt(req.params.userId);
  try {
    const { biography,
      is_baby_allowed,
      is_non_vaccinated_allowed,
      is_animal_allowed,
      is_smoker_allowed,
      selected_languages,
      selected_musics } = req.body as UserPreferencesBody;

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
      .where(sql`user.id = ${userId}`)
      .execute();

    res.status(200).send({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send('internalServerError');
  }
});


export { preferenceRouter };
