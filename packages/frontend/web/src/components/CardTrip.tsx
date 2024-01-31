type SearchTripFilter = {
  start_address: string;
  end_address: string;
  date: Date;
  price: number;
  seat_available: number;
  kilometer: number;
  travel_time: number;
  t_id: bigint;
  c_t_id: bigint;
  t_kilometer: number;
  t_travel_time: number;
  start_distance: number;
  end_distance: number;
  passengerCheckpointTrip: {
    id: bigint;
    reserved_seat: number;
    checkpoint_trip_id: number;
    reservation_id: null | number;
  }[];
}[];

export default function CardTrip({
  searchTripFilter,
}: {
  readonly searchTripFilter: SearchTripFilter;
}) {
  return (
    <>
      {searchTripFilter.map((search) => {
        const timeStart = new Date(search.date);
        const timeEnd = new Date(search.date).setHours(
          new Date(search.date).getHours(),
          new Date(search.date).getMinutes() + search.travel_time,
        );
        const init = new Date().setHours(0, 0, 0, 0);
        const travelTime = new Date(init).setHours(
          new Date(init).getHours(),
          new Date(init).getMinutes() + search.travel_time,
        );
        const timeEndFormat = `${new Date(timeEnd).getHours().toString().padStart(2, '0')}h${new Date(timeEnd).getMinutes().toString().padStart(2, '0')}`;
        const timeStartFormat = `${new Date(timeStart).getHours().toString().padStart(2, '0')}h${new Date(timeStart).getMinutes().toString().padStart(2, '0')}`;
        const travelTimeFormat = `${new Date(travelTime).getHours().toString().padStart(2, '0')}h${new Date(travelTime).getMinutes().toString().padStart(2, '0')}`;

        return (
          <div
            key={search.c_t_id}
            className='text-primary flex h-[180px] w-[500px] justify-between rounded-xl bg-slate-100 p-4 font-semibold shadow-md'
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
              <div>{'USER INFO / STAR'}</div>
            </div>
            <div className='flex flex-col items-end justify-between'>
              <p className='text-xl font-bold'>
                {search.price.toFixed(2)}
                {' €'}
              </p>
              <div className='flex space-x-1'>
                {search.passengerCheckpointTrip.map((seat) => (
                  <img
                    key={seat.id}
                    src={
                      seat.reserved_seat === null
                        ? '/icons/empty-seat.svg'
                        : '/icons/reserved-seat.svg'
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
