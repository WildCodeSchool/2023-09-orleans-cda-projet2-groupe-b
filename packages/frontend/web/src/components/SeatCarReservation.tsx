import { zodResolver } from '@hookform/resolvers/zod';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import {
  type ReservationSeatTripType,
  reservationSeatTripSchema,
} from '@app/types/src/search-trip-validation';

import { useAuth } from '@/contexts/AuthContext';

type SeatAvailable = {
  id: number;
  reserved_seat: number;
}[];

export default function SeatCarReservation({
  seatAvailable,
  numberSeat,
  shouldAutoValidate,
}: {
  readonly numberSeat: number;
  readonly seatAvailable: SeatAvailable;
  readonly shouldAutoValidate: boolean;
}) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const seatInTheCar = Array.from(
    { length: numberSeat },
    (_, index) => index + 1,
  );

  const numberSeatAvailable = new Set(
    seatAvailable.map((seat) => seat.reserved_seat),
  );
  const seatReservable = seatInTheCar
    .map((seat) => {
      if (numberSeatAvailable.has(seat)) {
        return seat;
      }
    })
    .filter((seat) => seat !== undefined) as number[];

  const [seatSelect, setSeatSelect] = useState<number[]>([]);
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checkboxValue = Number.parseInt(event.target.value);
    if (event.target.checked) {
      setSeatSelect((prev) => [...prev, checkboxValue]);
    } else {
      setSeatSelect((prev) => {
        const index = prev.indexOf(checkboxValue);
        const newArray = [...prev];
        newArray.splice(index, 1);
        return newArray;
      });
    }
  };

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm<ReservationSeatTripType>({
    resolver: zodResolver(reservationSeatTripSchema),
    defaultValues: {
      shouldAutoValidate: shouldAutoValidate,
    },
  });
  const onSubmit: SubmitHandler<ReservationSeatTripType> = async (data) => {
    console.log(data);
    try {
      const response = await fetch(`/api/reservation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (responseData.ok === true) {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (errors.seatSelectId && seatSelect.length > 0) {
      clearErrors('seatSelectId');
    }

    const seatSelectId = seatAvailable
      .map((seat) => {
        if (seatSelect.includes(seat.reserved_seat)) {
          return seat.id;
        }
      })
      .filter((seat) => seat !== undefined) as number[];

    console.log('seatSelectWithId', seatSelectId);

    setValue('seatSelectId', seatSelectId);
  }, [seatSelect]);

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col items-center rounded-xl bg-slate-100 p-4 shadow-md'
    >
      <h1 className='text-primary'>{'Select your seats'}</h1>
      <div className='mt-9 grid grid-cols-6'>
        {seatInTheCar.map((seat) => {
          let imgSeat = '/icons/no-seat.svg';

          if (seatSelect.includes(seat)) {
            imgSeat = '/icons/seat-select.svg';
          } else if (seatReservable.includes(seat)) {
            imgSeat = '/icons/seat.svg';
          }
          return (
            <div
              key={seat}
              className={`relative h-[54px] w-[50px] ${classSeatInTheCar(seat)}`}
            >
              <input
                type='checkbox'
                onChange={handleCheckboxChange}
                value={seat}
                checked={seatSelect.includes(seat)}
                className='absolute h-full w-full opacity-0'
                disabled={seatReservable.includes(seat) ? false : true}
              />
              <img src={imgSeat} className='h-full w-full' />
              {seat === 1 ? (
                <img
                  src={'/icons/steering-wheel.svg'}
                  className='absolute top-[-29px] h-full w-full p-1'
                />
              ) : undefined}
            </div>
          );
        })}
      </div>
      {errors.seatSelectId?.message ? (
        <span className='text-red-700'>{errors.seatSelectId.message}</span>
      ) : undefined}
      {isLoggedIn ? (
        <button
          type='submit'
          className='my-8 rounded-lg bg-slate-400 p-3 text-xl'
        >
          {'Reserved'}
        </button>
      ) : (
        <div className='flex flex-col items-center'>
          <p className='text-primary font-normal'>
            {'if you would like to make a reservation please log in'}
          </p>
          <Link
            to={'/login'}
            className='my-4 rounded-lg bg-slate-400 p-3 text-xl'
          >
            {'Log in'}
          </Link>
        </div>
      )}
    </form>
  );
}
