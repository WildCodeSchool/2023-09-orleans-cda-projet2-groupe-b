import type { Request, Response } from 'express';
import express from 'express';
import * as jose from 'jose';
import validateLogin from 'middleware/validate-login';
import validateRegister from 'middleware/validate-register';

import { db } from '@app/backend-shared';
import type { LoginBody, RegisterBody } from '@app/types';

const JWT_SECRET = process.env.JWT_SECRET;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

if (JWT_SECRET === undefined) {
  throw new Error('JWT_SECRET is undefined');
}

const SECRET = new TextEncoder().encode(JWT_SECRET);

const authRouter = express.Router();

authRouter.get('/check', async (req, res) => {
  const jwt: string | undefined = req.signedCookies.token;

  if (jwt === undefined) {
    return res.json({
      ok: true,
      isLoggedIn: false,
    });
  }

  try {
    await jose.jwtVerify(jwt, SECRET, {
      issuer: 'http://localhost',
      audience: 'http://localhost',
    });
    return res.json({
      ok: true,
      isLoggedIn: true,
    });
  } catch (error) {
    if (error instanceof jose.errors.JWTExpired) {
      return res.json({
        ok: true,
        isLoggedIn: false,
      });
    }
    return res.json({
      ok: false,
      error,
    });
  }
});

authRouter.post(
  '/register',
  validateRegister,
  async (req: Request, res: Response) => {
    const { email, password, firstname, lastname, birthdate } =
      req.body as RegisterBody;

    try {
      const hashedPassword = await Bun.password.hash(password, {
        algorithm: 'bcrypt',
        cost: 10,
      });
      await db
        .insertInto('user')
        .values({
          email,
          password: hashedPassword,
          firstname,
          lastname,
          birthdate,
          passenger_kilometer_traveled: 0,
          driver_kilometer_traveled: 0,
          economy_achieved: 0,
        })
        .execute();

      const jwt = await new jose.SignJWT({
        sub: email,
      })
        .setProtectedHeader({
          alg: 'HS256',
        })
        .setIssuedAt()
        .setIssuer('http://localhost')
        .setAudience('http://localhost')
        .setExpirationTime('2h')
        .sign(SECRET);

      res.cookie('token', jwt, {
        httpOnly: true,
        sameSite: true,
        secure: IS_PRODUCTION,
        signed: true,
      });

      return res.json({
        ok: true,
        isLoggedIn: true,
      });
    } catch (error) {
      return res.json({
        ok: false,
        error,
      });
    }
  },
);

authRouter.post(
  '/login',
  validateLogin,
  async (req: Request, res: Response) => {
    const { email, password } = req.body as LoginBody;

    try {
      const user = await db
        .selectFrom('user')
        .select(['user.password'])
        .where('user.email', '=', email)
        .executeTakeFirst();
      if (user === undefined) {
        return res.json({
          ok: true,
          isLoggedIn: false,
        });
      }

      const isCorrectPassword = await Bun.password.verify(
        password,
        user.password,
        'bcrypt',
      );

      if (!isCorrectPassword) {
        return res.json({
          ok: true,
          isLoggedIn: false,
        });
      }

      const jwt = await new jose.SignJWT({
        sub: email,
      })
        .setProtectedHeader({
          alg: 'HS256',
        })
        .setIssuedAt()
        .setIssuer('http://localhost')
        .setAudience('http://localhost')
        .setExpirationTime('2h')
        .sign(SECRET);

      res.cookie('token', jwt, {
        httpOnly: true,
        sameSite: true,
        secure: IS_PRODUCTION,
        signed: true,
      });
      return res.json({
        ok: true,
        isLoggedIn: isCorrectPassword,
      });
    } catch (error) {
      return res.json({
        ok: false,
        error,
      });
    }
  },
);
authRouter.post('/logout', (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: 'lax',
    expires: new Date(0),
  });
  res.json({
    ok: true,
    isLoggedIn: false,
  });
});

export { authRouter };
