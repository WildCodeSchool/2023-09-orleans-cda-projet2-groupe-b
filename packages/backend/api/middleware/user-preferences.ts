import type { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const userPreferences = [
    body('is_smoker_allowed')
    .isBoolean(),
    body('is_animal_allowed')
    .isBoolean(),
    body('is_baby_allowed')
    .isBoolean(),
    body('is_non_vaccinated_allowed')
    .isBoolean(),
];

export default userPreferences;