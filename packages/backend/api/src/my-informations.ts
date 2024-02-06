import express from 'express';
import { sql } from 'kysely';
import { db } from '@app/backend-shared';

const infoRouter = express.Router();

infoRouter.get('/:userId', async (req, res) => {
  const userId = Number.parseInt(req.params.userId);
  try {
    const user = await db
      .selectFrom('user')
      .select(['id', 'firstname', 'lastname', 'email', 'birthdate', 'avatar'])
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

export { infoRouter };
