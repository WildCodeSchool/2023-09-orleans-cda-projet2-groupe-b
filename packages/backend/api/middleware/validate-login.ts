import type { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const validateLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('This field is required')
    .isEmail()
    .isLength({ max: 254 })
    .withMessage('Should contain less than 254 characters'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('This field is required')
    .isLength({ min: 6 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
    } else {
      res.status(422).json({ validationErrors: errors.array() });
    }
  },
];

export default validateLogin;
