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
  selected_languages: z.string(), // Assurez-vous que cette clé est présente
  selected_musics: z.string(),
})
export type UserPreferencesType = z.infer<typeof userPreferencesSchema>;
