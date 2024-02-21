import type { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const validationCar = [
  body('brand')
    .trim()
    .notEmpty()
    .isString()
    .isLength({ max: 15 })
    .withMessage({ message: 'Should contain less than 15 characters' }),
  body('model')
    .trim()
    .notEmpty()
    .isString()
    .isLength({ max: 25 })
    .withMessage({ message: 'Should contain less than 25 characters' }),
  body('photo')
    .trim()
    .notEmpty()
    .isString()
    .isLength({ max: 255 })
    .withMessage({ message: 'Should contain less than 255 characters' }),
  body('number_seat')
    .trim()
    .notEmpty()
    .isInt()
    .isLength({ min: 1 })
    .withMessage({ message: 'This field is required' }),
  body('color')
    .trim()
    .notEmpty()
    .isString()
    .isLength({ max: 10 })
    .withMessage({ message: 'Should contain less than 10 characters' }),
  body('plate_number')
    .trim()
    .notEmpty()
    .isString()
    .isLength({ max: 12 })
    .withMessage({ message: 'Should contain less than 12 characters' }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
    } else {
      res.status(422).json({ validationErrors: errors.array() });
    }
  },
];

export default validationCar;
