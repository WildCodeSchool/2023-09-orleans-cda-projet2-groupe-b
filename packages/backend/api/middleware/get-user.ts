import type { NextFunction, Request, Response } from 'express';
import * as jose from 'jose';

import { db } from '@app/backend-shared';

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (JWT_SECRET === undefined) {
    throw new Error('JWT_SECRET is undefined');
  }

  const SECRET = new TextEncoder().encode(JWT_SECRET);

  const jwt: string | undefined = req.signedCookies.token;

  if (jwt === undefined) {
    return res.status(401).json({
      ok: false,
      message: 'JWT not present',
    });
  }

  try {
    const decoded = await jose.jwtVerify(jwt, SECRET);
    const email = decoded.payload.sub;

    if (email === undefined) {
      return res.status(401).json({
        ok: false,
        message: 'Email not present',
      });
    }

    const user = await db
      .selectFrom('user')
      .selectAll()
      .where('user.email', '=', email)
      .executeTakeFirst();

    res.locals.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      error,
    });
  }
};
