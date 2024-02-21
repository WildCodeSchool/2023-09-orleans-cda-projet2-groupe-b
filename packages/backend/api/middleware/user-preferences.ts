import { body } from 'express-validator';

const userPreferences = [
    body('is_smoker_allowed')
    .isBoolean(),
    body('is_animal_allowed')
    .isBoolean(),
    body('is_baby_allowed')
    .isBoolean(),
    body('is_non_vaccinated_allowed')
    .isBoolean(),
    body('selected_musics').toString(),
    body('selected_languages').toString(),
];

export default userPreferences;