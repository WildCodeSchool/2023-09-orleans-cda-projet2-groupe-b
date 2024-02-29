import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ZodError } from 'zod';

import {
  type ReservationSeatPublishTripType,
  reservationSeatPublishTripSchema,
} from '@app/shared';

export default function SeatCar({
  numberSeat,
}: {
  readonly numberSeat: number;
}) {
  const seatInTheCar = Array.from(
    { length: numberSeat },
    (_, index) => index + 1,
  );

  const {
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<ReservationSeatPublishTripType>();

  const [seatAvailable, setSeatAvailable] = useState<number[]>(
    seatInTheCar.slice(1),
  );

  useEffect(() => {
    setSeatAvailable(seatInTheCar.slice(1));
  }, [numberSeat]);

  useEffect(() => {
    setValue('reservationSeat', seatAvailable);
    const reservationSeat = getValues('reservationSeat');
    try {
      reservationSeatPublishTripSchema.parse({
        reservationSeat: reservationSeat,
      });
      clearErrors('reservationSeat');
    } catch (error) {
      if (error instanceof ZodError) {
        setError('reservationSeat', {
          message: error.errors[0].message,
        });
      }
    }
  }, [seatAvailable, clearErrors, setError, getValues]);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checkboxValue = Number.parseInt(event.target.value);
    if (event.target.checked) {
      setSeatAvailable((prev) => [...prev, checkboxValue]);
    } else {
      setSeatAvailable((prev) => {
        const index = prev.indexOf(checkboxValue);
        const newArray = [...prev];
        newArray.splice(index, 1);
        return newArray;
      });
    }
  };

  const classSeatInTheCar = (seat: number) => {
    switch (seatInTheCar.length) {
      case 2: {
        break;
      }
      case 4: {
        switch (seat) {
          case 1: {
            return 'col-start-1 col-end-4 ml-[12px]';
          }
          case 2: {
            return 'col-start-4 col-end-7 ml-[13px]';
          }
          case 3: {
            return 'col-start-1 col-end-4 ml-[18px] mt-6';
          }
          case 4: {
            return 'col-start-4 col-end-7 ml-[7px] mt-6';
          }
        }

        break;
      }
      case 5: {
        switch (seat) {
          case 1: {
            return 'col-start-1 col-end-4 ml-[7px]';
          }
          case 2: {
            return 'col-start-4 col-end-7 ml-[18px]';
          }
          case 3: {
            return 'col-start-1 col-end-3 mt-6';
          }
          case 4: {
            return 'col-start-3 col-end-5 mt-6';
          }
          case 5: {
            return 'col-start-5 col-end-7 mt-6';
          }
        }

        break;
      }
      case 8: {
        switch (seat) {
          case 1: {
            return 'col-start-1 col-end-4 ml-[7px]';
          }
          case 2: {
            return 'col-start-4 col-end-7 ml-[18px]';
          }
          case 3: {
            return 'col-start-1 col-end-3 mt-6';
          }
          case 4: {
            return 'col-start-3 col-end-5 mt-6';
          }
          case 5: {
            return 'col-start-5 col-end-7 mt-6';
          }
          case 6: {
            return 'col-start-1 col-end-3 mt-6';
          }
          case 7: {
            return 'col-start-3 col-end-5 mt-6';
          }
          case 8: {
            return 'col-start-5 col-end-7 mt-6';
          }
        }

        break;
      }
      case 9: {
        switch (seat) {
          case 1: {
            return 'col-start-1 col-end-3';
          }
          case 2: {
            return 'col-start-3 col-end-5';
          }
          case 3: {
            return 'col-start-5 col-end-7';
          }
          case 4: {
            return 'col-start-1 col-end-3 mt-6';
          }
          case 5: {
            return 'col-start-3 col-end-5 mt-6';
          }
          case 6: {
            return 'col-start-5 col-end-7 mt-6';
          }
          case 7: {
            return 'col-start-1 col-end-3 mt-6';
          }
          case 8: {
            return 'col-start-3 col-end-5 mt-6';
          }
          case 9: {
            return 'col-start-5 col-end-7 mt-6';
          }
          default: {
            return '';
          }
        }

        break;
      }
      // No default
    }
  };

  return (
    <div className='text-dark flex flex-col items-center rounded-xl bg-slate-100 p-4'>
      <h1>{'deselect empty seats'}</h1>
      <img src='/icons/line-car.svg' className='mt-6' />
      <div className='mt-6 grid grid-cols-6'>
        {seatInTheCar.map((seat) => (
          <div
            key={seat}
            className={`relative h-[54px] w-[50px] ${classSeatInTheCar(seat)}`}
          >
            <input
              type='checkbox'
              onChange={handleCheckboxChange}
              value={seat}
              checked={seatAvailable.includes(seat)}
              className='absolute h-full w-full opacity-0'
              disabled={seat === seatInTheCar[0]}
            />
            <img
              src={
                seatAvailable.includes(seat)
                  ? '/icons/seat.svg'
                  : '/icons/no-seat.svg'
              }
              className='h-full w-full'
            />
            {seat === 1 ? (
              <img
                src={'/icons/steering-wheel.svg'}
                className='absolute top-[-29px] h-full w-full p-1'
              />
            ) : undefined}
          </div>
        ))}
      </div>
      <span className='text-red-700'>{errors.reservationSeat?.message}</span>
    </div>
  );
}
