import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import type { DataSearchTripDetails } from '@app/types';

import SeatCarReservation from './SeatCarReservation';

type Reservations = {
  id: bigint;
  reserved_seat: number;
  reservation_id: bigint | null;
  checkpoint_trip_id: bigint;
};

type SeatAvailable = {
  id: number;
  reserved_seat: number;
}[];

export default function SearchTripDetails() {
  const [trip, setTrip] = useState<DataSearchTripDetails>();
  const [seatAvailable, setSeatAvailable] = useState<SeatAvailable>([]);

  const { id } = useParams();

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const response = await fetch(`/api/search-trip/${id}`, {
          signal: controller.signal,
        });
        const data = await response.json();
        setTrip(data);
        console.log(data);
        console.log('azeazdaze', data.reservations);

        const filterSeatAvailable = data.reservations
          .map((seat: Reservations) => {
            if (seat.reservation_id === null) {
              return { id: seat.id, reserved_seat: seat.reserved_seat };
            }
          })
          .filter((seat: Reservations) => seat !== undefined) as SeatAvailable;
        setSeatAvailable(filterSeatAvailable);
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      controller.abort();
    };
  }, []);

  if (!trip) {
    console.log('Trip undefined');
    return;
  }
  const timeStart = new Date(trip.trip.date);
  const timeEnd = new Date(trip.trip.date).setHours(
    new Date(trip.trip.date).getHours(),
    new Date(trip.trip.date).getMinutes() + trip.travel_time,
  );
  const init = new Date().setHours(0, 0, 0, 0);
  const travelTime = new Date(init).setHours(
    new Date(init).getHours(),
    new Date(init).getMinutes() + trip.travel_time,
  );

  const timeFormat = (time: Date | number) => {
    return `${new Date(time).getHours().toString().padStart(2, '0')}h${new Date(
      time,
    )
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  };
  const timeStartFormat = timeFormat(timeStart);
  const travelTimeFormat = timeFormat(travelTime);
  const timeEndFormat = timeFormat(timeEnd);

  console.log(
    'aaaaaaaaaaaaaa',
    timeStartFormat,
    travelTimeFormat,
    timeEndFormat,
  );

  return (
    <div className=' mt-8 flex flex-col items-center'>
      <div className='w-[800px] space-y-6 rounded-lg bg-blue-300 p-8'>
        <div className='text-xl font-semibold'>
          {new Date(trip.trip.date).toDateString()}
        </div>
        <div className='text-primary flex justify-between rounded-xl bg-slate-100 p-4 font-semibold shadow-md'>
          <div className='flex space-x-4'>
            <div className='flex flex-col space-y-2'>
              <p>{timeStartFormat}</p>
              <p>{travelTimeFormat}</p>
              <p>{timeEndFormat}</p>
            </div>
            <img src='/icons/symbole-itinerary.svg' alt='image' />
            <div className='flex flex-col justify-between'>
              <div>
                <p>{trip.start_address.split(',')[0]}</p>
              </div>
              <div>
                <p>{trip.end_address.split(',')[0]}</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-end justify-between'>
            <p className='text-xl font-bold'>
              {trip.trip.price.toFixed(2)}
              {' €'}
            </p>
            <p>
              {trip.trip.should_auto_validate
                ? ''
                : '⚠ Reservation on validation'}
            </p>
          </div>
        </div>
        <div>
          <p className='text-xl font-semibold'>{'Your driver'}</p>
          <div className='text-primary flex items-center justify-between rounded-xl bg-slate-100 p-4 text-xl font-semibold shadow-md'>
            <div className='flex items-center space-x-8'>
              <img
                src={
                  trip.trip.driver.avatar === null
                    ? `/icons/profile-placeholder.svg`
                    : trip.trip.driver.avatar
                }
              />
              <p className=''>
                {trip.trip.driver.firstname} {trip.trip.driver.lastname}
              </p>
              <p>{'Note ★ 4/5'}</p>
            </div>
            <button className='rounded-full bg-slate-500 p-4 text-white'>
              {'Profile'}
            </button>
          </div>
        </div>
        <div>
          <p className='text-xl font-semibold'>{'Trip infos'}</p>
          <div className='text-primary flex flex-col space-y-4 rounded-xl bg-slate-100 p-4 text-xl shadow-md'>
            <p className='font-semibold'>{trip.trip.comment}</p>
            <div className='flex justify-between'>
              <div className='flex space-x-2'>
                <img
                  src={
                    trip.trip.is_smoker_allowed
                      ? '/icons/check.svg'
                      : '/icons/uncheck.svg'
                  }
                />
                <p>{'Smoking'}</p>
              </div>
              <div className='flex space-x-2'>
                <img
                  src={
                    trip.trip.is_animal_allowed
                      ? '/icons/check.svg'
                      : '/icons/uncheck.svg'
                  }
                />
                <p>{'Pets'}</p>
              </div>
              <div className='flex space-x-2'>
                <img
                  src={
                    trip.trip.is_baby_allowed
                      ? '/icons/check.svg'
                      : '/icons/uncheck.svg'
                  }
                />
                <p>{'Baby'}</p>
              </div>
              <div className='flex space-x-2'>
                <img
                  src={
                    trip.trip.is_non_vaccinated_allowed
                      ? '/icons/check.svg'
                      : '/icons/uncheck.svg'
                  }
                />
                <p>{'Unvaccinated'}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='text-lg font-semibold'>
          <p>{'The car'}</p>
          <div className='flex space-x-8'>
            <div className='text-primary rounded-xl bg-slate-100 p-4 shadow-md'>
              {trip.trip.car.photo === '' || trip.trip.car.photo === null ? (
                <div>
                  <p>{'Brand Model'}</p>
                  <p>
                    {'Plate number : '}
                    {trip.trip.car.plate_number}
                  </p>
                  <p>
                    {'Color :'}
                    <div
                      className={`h-8 w-16 rounded-lg`}
                      style={{ background: trip.trip.car.color }}
                    />
                  </p>
                </div>
              ) : undefined}
            </div>
          </div>
          <div className='mt-8'>
            <SeatCarReservation
              seatAvailable={seatAvailable}
              numberSeat={trip.trip.car.number_seat}
              shouldAutoValidate={Boolean(trip.trip.should_auto_validate)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
