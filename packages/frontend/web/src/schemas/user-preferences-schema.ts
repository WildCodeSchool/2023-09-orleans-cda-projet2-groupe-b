import { z } from 'zod';

export const userPreferencesSchema = z.object({
  biography: z
    .string()
    .trim(),
  is_baby_allowed: z
    .boolean(),
  is_non_vaccinated_allowed: z
    .boolean(),
  is_animal_allowed: z
    .boolean(),
  is_smoker_allowed: z
    .boolean(),
  musicStyles: z.object({
    rock: z.boolean(),
    jazz: z.boolean(),
    rap: z.boolean(),
    rnb: z.boolean(),
    pop: z.boolean(),
  }).refine(data => Object.values(data).some(Boolean)),
  languageSpoken: z.object({
    english: z.boolean(),
    spanish: z.boolean(),
    deutsch: z.boolean(),
    french: z.boolean(),
  }).refine(data => Object.values(data).some(Boolean))
})
export type UserPreferencesType = z.infer<typeof userPreferencesSchema>;

// // Définissez les clés pour musicStyles et languageSpoken
// type MusicStylesKeys = keyof UserPreferencesType['musicStyles'];
// type LanguageSpokenKeys = keyof UserPreferencesType['languageSpoken'];

// // Créez un type pour les clés de formulaire possibles
// export type UserPreferencesFormKeys = keyof UserPreferencesType | `${'musicStyles'}.${MusicStylesKeys}` | `${'languageSpoken'}.${LanguageSpokenKeys}`;
