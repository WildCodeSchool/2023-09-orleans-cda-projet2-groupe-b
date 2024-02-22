import { z } from 'zod';

const ACCEPTED_IMAGE_TYPES = new Set(['image/png', 'image/jpg', 'image/jpeg']);
const MAX_IMAGE_SIZE = 2; //In MegaBytes

const sizeInMB = (sizeInBytes: number, decimalsNumber = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNumber);
};
export const validationCarSchema = z.object({
  brand: z
    .string()
    .min(1, { message: 'This field is required' })
    .max(15, { message: 'Should contain less than 15 characters' })
    .trim(),

  model: z
    .string()
    .min(1, { message: 'This field is required' })
    .max(25, { message: 'Should contain less than 25 characters' })
    .trim(),
  photo: z
    .custom<FileList>()
    .refine((files) => {
      return [...(files ?? [])].length > 0;
    }, 'Image is required')
    .refine((files) => {
      return [...(files ?? [])].every(
        (file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE,
      );
    }, `The maximum image size is ${MAX_IMAGE_SIZE}MB`)
    .refine((files) => {
      return [...(files ?? [])].every((file) =>
        ACCEPTED_IMAGE_TYPES.has(file.type),
      );
    }, 'File type is not supported'),
  number_seat: z.preprocess(
    Number,
    z
      .number()
      .int()
      .nonnegative({ message: 'This field contain not negative numbers' })
      .min(1, { message: 'This field is required' }),
  ),
  color: z
    .string()
    .min(1, { message: 'This field is required' })
    .max(10, { message: 'Should contain less than 10 characters' })
    .trim(),

  plate_number: z
    .string()
    .min(1, { message: 'This field is required' })
    .max(12, { message: 'Should contain less than 12 characters' })
    .trim(),
});

export type ValidationCarSchema = z.infer<typeof validationCarSchema>;
