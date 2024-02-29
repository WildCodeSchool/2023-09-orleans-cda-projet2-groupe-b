import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { type InfoPublishTripType, infoPublishTripSchema } from '@app/shared';

import SeatCar from './SeatCar';
import SeatPrice from './SeatPrice';

interface Cars {
  id: bigint;
  brand?: string;
  model?: string;
  number_seat: number;
}
[];

export default function Info() {
  const {
    register,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<InfoPublishTripType>();

  const [cars, setCars] = useState<Cars[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const response = await fetch(`/api/trip/car`, {
          signal: controller.signal,
        });

        const data = await response.json();
        setCars(data);
      } catch (error) {
        throw new Error(`${String(error)}`);
      }
    })();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (getValues('carId') === '' && cars.length > 0) {
      setValue('carId', String(cars[0].id));
    }
  }, [cars]);

  const carSelect = cars.find((car) => String(car.id) === watch('carId'));

  const numberSeat = carSelect?.number_seat;

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
        <div className='space-y-5 p-4'>
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
              className='text-dark w-full rounded-lg border p-2 drop-shadow'
            >
              {cars.map((car) => (
                <option key={car.id} value={String(car.id)}>
                  {'Brand - Model'} {car.number_seat}
                </option>
              ))}
            </select>
            <Link to={'/cars/add'}>
              <button
                type='button'
                className='flex justify-center rounded-lg border drop-shadow'
              >
                <img src='/icons/add-car.svg' className='mx-3 my-[6px]' />
              </button>
            </Link>
          </div>
          <span className='text-red-700'>{errors.carId?.message}</span>
        </div>
        {numberSeat === undefined ? undefined : (
          <SeatCar numberSeat={numberSeat} />
        )}

        <div className='space-y-5 p-4'>
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
          className='text-dark rounded-lg border p-2 drop-shadow'
        />
        <span className='text-red-700'>{errors.comment?.message}</span>
      </div>
    </div>
  );
}
