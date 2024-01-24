import { useFormContext } from 'react-hook-form';

import { type InfoPublishTripType, infoPublishTripSchema } from '@app/shared';

import SeatPrice from './SeatPrice';
import SeatVehicle from './SeatVehicle';

export default function Info() {
  const {
    register,
    formState: { errors },
  } = useFormContext<InfoPublishTripType>();

  const seatCar = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const preferences = {
    shouldAutoValidate: 'Instant reservation',
    isSmokerAllowed: 'Accept smoking',
    isAnimalAllowed: 'Accept pets',
    isBabyAllowed: 'Accept baby',
    isNonVaccinatedAllowed: 'Accept unvaccinated',
  };

  return (
    <div className='flex justify-center'>
      <div className='flex w-96 flex-col space-y-4 p-6'>
        <SeatPrice />
        <div className='space-y-5 bg-slate-100 p-4'>
          <h1 className='text-center'>{'Select your car'}</h1>
          <div className='flex space-x-2'>
            <select
              {...register('carId', {
                validate: (value) => {
                  const result =
                    infoPublishTripSchema.shape.carId.safeParse(value);
                  return result.success ? true : result.error.errors[0].message;
                },
              })}
              className='w-full rounded-lg border p-2 drop-shadow'
            >
              <option value='' />
              <option value={String(1n)}>{'Renault clio IV'}</option>
            </select>
            <button type='button' className='rounded-lg border p-2 drop-shadow'>
              <img src='/icons/add-car.svg' />
            </button>
          </div>
          <span className='text-red-700'>{errors.carId?.message}</span>
        </div>

        <SeatVehicle seatCar={seatCar} />
        <div className='space-y-5 bg-slate-100 p-4'>
          <h1 className='text-center'>{'Preferences'}</h1>
          {Object.entries(preferences).map((preference) => (
            <label key={preference[0]} className='flex justify-between'>
              {preference[1]}
              <div className='relative h-5 w-14 cursor-pointer rounded-full bg-gray-200 shadow-inner'>
                <input
                  type='checkbox'
                  {...register(preference[0] as keyof InfoPublishTripType)}
                  className='peer sr-only'
                />
                <span className='absolute left-0 top-[-4px] h-7 w-7 rounded-full bg-gray-300 transition-all duration-500 peer-checked:left-7 peer-checked:bg-gray-800' />
              </div>
            </label>
          ))}
        </div>
        <textarea
          {...register('comment', {
            validate: (value) => {
              const result =
                infoPublishTripSchema.shape.comment.safeParse(value);
              return result.success ? true : result.error.errors[0]?.message;
            },
          })}
          placeholder='Message'
          className='rounded-lg border p-2 drop-shadow'
        />
        <span className='text-red-700'>{errors.comment?.message}</span>
      </div>
    </div>
  );
}
