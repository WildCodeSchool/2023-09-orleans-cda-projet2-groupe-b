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
        .boolean()
})

export type UserPreferencesType = z.infer<typeof userPreferencesSchema>;

export const musicPreferencesSchema = z.object({
    musicStyles: z.object({
      rock: z.boolean(),
      jazz: z.boolean(),
      rap: z.boolean(),
      rnb: z.boolean(),
      pop: z.boolean(),
    }).refine(data => Object.values(data).some(value => value), {
      message: 'ⓘ Please select at least one music style',
    }),
  });
  export type LMusicPreferencesType = z.infer<
    typeof musicPreferencesSchema>

    export const languagePreferencesSchema = z.object({
      languageSpoken: z.object({
        english: z.boolean(),
        spanish: z.boolean(),
        deutsch: z.boolean(),
        french: z.boolean(),
      }).refine(data => Object.values(data).some(value => value), {
        message: 'ⓘ Please select at least one music style',
      }),
    });
    export type LanguagePreferencesType = z.infer<
      typeof languagePreferencesSchema>