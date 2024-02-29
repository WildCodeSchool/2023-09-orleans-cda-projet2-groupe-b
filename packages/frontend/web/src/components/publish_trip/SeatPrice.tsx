import type { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';

import { type InfoPublishTripType, infoPublishTripSchema } from '@app/shared';

export default function SeatPrice() {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<InfoPublishTripType>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const replace = value.replace(/\D/g, '');
    setValue('price', Number(replace));
  };

  const handleIncrement = () => {
    setValue('price', Number(getValues('price')) + 1);
  };

  const handleDecrement = () => {
    setValue('price', Number(getValues('price')) - 1);
  };

  return (
    <div className='flex flex-col items-center space-y-4 p-4'>
      <label>{'Price of the place'}</label>
      <div className='flex space-x-4'>
        <button
          type='button'
          onClick={handleDecrement}
          className='p-4 text-2xl'
        >
          {'-'}
        </button>
        <input
          type='number'
          className='text-dark text-center'
          defaultValue={Number(1)}
          {...register('price', {
            validate: (value) => {
              const result = infoPublishTripSchema.shape.price.safeParse(value);
              return result.success ? true : result.error.errors[0].message;
            },
            onChange: handleChange,
          })}
        />
        <button
          type='button'
          onClick={handleIncrement}
          className='p-4 text-2xl'
        >
          {'+'}
        </button>
      </div>
      <span className='text-red-700'>{errors.price?.message}</span>
    </div>
  );
}
