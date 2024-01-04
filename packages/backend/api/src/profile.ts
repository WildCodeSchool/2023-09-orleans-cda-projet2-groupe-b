import express from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

const userRouter = express.Router();

userRouter.get('/:userId', async (req, res) => {
  const userId = Number.parseInt(req.params.userId);

  try {
    const user = await db
      .selectFrom('user')
      .select(['id', 'firstname', 'lastname'])
      .where(sql`id = ${userId}`)
      .execute();

    if (user.length === 0) {
      // Aucun utilisateur trouvé avec l'ID spécifié
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.status(200).json(user[0]);
  } catch (error) {
    // Gérer les erreurs ici
    console.error(error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

export { userRouter };
