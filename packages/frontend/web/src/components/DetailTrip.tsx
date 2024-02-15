import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContext';

import SeatCarReservation from './SeatCarReservation';

type DetailTrip = {
  cp_t_id: bigint;
  start_address: string;
  end_address: string;
  cp_t_kilometer: number;
  cp_t_travel_time: number;
  t_id: bigint;
  driver_id: number;
  car_id: number;
  date: Date;
  price: number;
  comment?: string;
  seat_available: number;
  should_auto_validate: boolean;
  is_animal_allowed: boolean;
  is_baby_allowed: boolean;
  is_smoker_allowed: boolean;
  is_non_vaccinated_allowed: boolean;
  firstname: string;
  lastname: string;
  avatar?: string;
  driverCar: {
    id: bigint;
    photo: string;
    number_seat: number;
    color: string;
    plate_number: string;
    user_id: number;
    car_type_id: number;
  };
  passengerCheckpointTrip: {
    id: bigint;
    reserved_seat: number;
    checkpoint_trip_id: number;
    reservation_id: null | number;
  }[];
};

type PassengerCheckpointTrip = {
  id: bigint;
  reserved_seat: number;
  checkpoint_trip_id: number;
  reservation_id: null | number;
};

type SeatAvailable = {
  id: number;
  reserved_seat: number;
}[];

export default function DetailCardTrip() {
  const [trip, setTrip] = useState<DetailTrip>();
  const [seatAvailable, setSeatAvailable] = useState<SeatAvailable>([]);

  const { id } = useParams();

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/search-trip/${id}`,
          {
            signal: controller.signal,
          },
        );
        const data = await response.json();
        setTrip(data);

        const filterSeatAvailable = data.passengerCheckpointTrip
          .map((seat: PassengerCheckpointTrip) => {
            if (seat.reservation_id === null) {
              return { id: seat.id, reserved_seat: seat.reserved_seat };
            }
          })
          .filter(
            (seat: PassengerCheckpointTrip) => seat !== undefined,
          ) as SeatAvailable;
        setSeatAvailable(filterSeatAvailable);
      } catch (error) {
        throw new Error(`${String(error)}`);
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
  const timeStart = new Date(trip.date);
  const timeEnd = new Date(trip.date).setHours(
    new Date(trip.date).getHours(),
    new Date(trip.date).getMinutes() + trip.cp_t_travel_time,
  );
  const init = new Date().setHours(0, 0, 0, 0);
  const travelTime = new Date(init).setHours(
    new Date(init).getHours(),
    new Date(init).getMinutes() + trip.cp_t_travel_time,
  );
  const timeEndFormat = `${new Date(timeEnd).getHours().toString().padStart(2, '0')}h${new Date(timeEnd).getMinutes().toString().padStart(2, '0')}`;
  const timeStartFormat = `${new Date(timeStart).getHours().toString().padStart(2, '0')}h${new Date(timeStart).getMinutes().toString().padStart(2, '0')}`;
  const travelTimeFormat = `${new Date(travelTime).getHours().toString().padStart(2, '0')}h${new Date(travelTime).getMinutes().toString().padStart(2, '0')}`;
  console.log('aaaaaaaaaaaaaa', seatAvailable);

  return (
    <div className=' mt-8 flex flex-col items-center'>
      <div className='w-[800px] space-y-6 rounded-lg bg-blue-300 p-8'>
        <div className='text-xl font-semibold'>
          {new Date(trip.date).toDateString()}
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
              {trip.price.toFixed(2)}
              {' €'}
            </p>
            <p>
              {trip.should_auto_validate ? '' : '⚠ Reservation on validation'}
            </p>
          </div>
        </div>
        <div>
          <p className='text-xl font-semibold'>{'Your driver'}</p>
          <div className='text-primary flex items-center justify-between rounded-xl bg-slate-100 p-4 text-xl font-semibold shadow-md'>
            <div className='flex items-center space-x-8'>
              <img
                src={
                  trip.avatar === null
                    ? `/icons/profile-placeholder.svg`
                    : trip.avatar
                }
              />
              <p className=''>
                {trip.firstname} {trip.lastname}
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
            <p className='font-semibold'>{trip.comment}</p>
            <div className='flex justify-between'>
              <div className='flex space-x-2'>
                <img
                  src={
                    trip.is_smoker_allowed
                      ? '/icons/check.svg'
                      : '/icons/uncheck.svg'
                  }
                />
                <p>{'Smoking'}</p>
              </div>
              <div className='flex space-x-2'>
                <img
                  src={
                    trip.is_animal_allowed
                      ? '/icons/check.svg'
                      : '/icons/uncheck.svg'
                  }
                />
                <p>{'Pets'}</p>
              </div>
              <div className='flex space-x-2'>
                <img
                  src={
                    trip.is_baby_allowed
                      ? '/icons/check.svg'
                      : '/icons/uncheck.svg'
                  }
                />
                <p>{'Baby'}</p>
              </div>
              <div className='flex space-x-2'>
                <img
                  src={
                    trip.is_non_vaccinated_allowed
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
              {trip.driverCar.photo === null ? (
                <div>
                  <p>{'Brand Model'}</p>
                  <p>
                    {'Plate number : '}
                    {trip.driverCar.plate_number}
                  </p>
                  <p>
                    {trip.driverCar.color}
                    {' ||||||'}
                  </p>
                </div>
              ) : (
                <img src={trip.driverCar.photo} className='' />
              )}
            </div>
          </div>
          <div className='mt-8'>
            <SeatCarReservation
              seatAvailable={seatAvailable}
              numberSeat={trip.driverCar.number_seat}
              shouldAutoValidate={Boolean(trip.should_auto_validate)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
