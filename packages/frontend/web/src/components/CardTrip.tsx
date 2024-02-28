import { Link } from 'react-router-dom';

import type { DataSearchTrip } from '@app/types';

export default function CardTrip({
  searchTripFilter,
}: {
  readonly searchTripFilter: DataSearchTrip[];
}) {
  return (
    <>
      {searchTripFilter.map((search) => {
        const timeStart = new Date(search.date);
        const timeEnd = new Date(search.date).setHours(
          new Date(search.date).getHours(),
          new Date(search.date).getMinutes() + search.cp_t_travel_time,
        );
        const init = new Date().setHours(0, 0, 0, 0);
        const travelTime = new Date(init).setHours(
          new Date(init).getHours(),
          new Date(init).getMinutes() + search.cp_t_travel_time,
        );
        const timeFormat = (time: Date | number) => {
          return `${new Date(time)
            .getHours()
            .toString()
            .padStart(2, '0')}h${new Date(time)
            .getMinutes()
            .toString()
            .padStart(2, '0')}`;
        };
        const timeStartFormat = timeFormat(timeStart);
        const travelTimeFormat = timeFormat(travelTime);
        const timeEndFormat = timeFormat(timeEnd);

        return (
          <Link
            to={String(search.cp_t_id)}
            key={search.cp_t_id}
            className='text-primary flex h-[150px] w-[500px] justify-between rounded-xl bg-slate-100 p-4 font-semibold shadow-md'
          >
            <div className='flex flex-col items-start justify-between'>
              <div className='flex space-x-4'>
                <div className='flex flex-col space-y-2'>
                  <p>{timeStartFormat}</p>
                  <p>{travelTimeFormat}</p>
                  <p>{timeEndFormat}</p>
                </div>
                <img src='/icons/symbole-itinerary.svg' alt='image' />
                <div className='flex flex-col'>
                  <div>
                    <p>{search.start_address.split(',')[0]}</p>
                    <p>
                      {(Math.round(search.start_distance) / 1000).toFixed(3)}
                      {'km'}
                    </p>
                  </div>
                  <div>
                    <p>{search.end_address.split(',')[0]}</p>
                    <p>
                      {(Math.round(search.end_distance) / 1000).toFixed(3)}
                      {'km'}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                {search.firstname} {search.lastname}
              </div>
            </div>
            <div className='flex flex-col items-end justify-between'>
              <p className='text-xl font-bold'>
                {search.price.toFixed(2)}
                {' €'}
              </p>
              <div className='flex space-x-1'>
                {[...search.passengerSearchTrip]
                  .sort((a, b) => {
                    if (
                      a.reservation_id === null &&
                      b.reservation_id !== null
                    ) {
                      return 1;
                    }
                    if (
                      a.reservation_id !== null &&
                      b.reservation_id === null
                    ) {
                      return -1;
                    }
                    return 0;
                  })
                  .map((seat) => (
                    <img
                      key={seat.id}
                      src={
                        seat.reservation_id === null
                          ? '/icons/empty-seat.svg'
                          : '/icons/reserved-seat.svg'
                      }
                    />
                  ))}
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
}
