import { APIProvider } from '@vis.gl/react-google-maps';
import { useAutocomplete } from '@vis.gl/react-google-maps';
import { useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';

import CardTrip from '@/components/CardTrip';

interface FromSearchTrip {
  from: string;
  to: string;
  date: Date;
  passenger: number;
}

// interface Places {
//   placesStart:
//     | {
//         lat: number | undefined;
//         lng: number | undefined;
//       }
//     | undefined;
//   placesEnd:
//     | {
//         lat: number | undefined;
//         lng: number | undefined;
//       }
//     | undefined;
// }

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

export default function SearchTrip() {
  const KEY = import.meta.env.VITE_REACT_GOOGLE_MAPS_API_KEY;

  if (KEY === undefined) {
    throw new Error('Key google maps is undefined');
  }

  // const [searchTripFilter, setSearchTripFilter] = useState<
  //   SearchTripFilter | undefined
  // >();

  const { handleSubmit, register, control, watch, setValue } =
    useForm<FromSearchTrip>({
      defaultValues: { from: '' },
    });

  const onSubmit = async (data: FromSearchTrip) => {
    const date = `${new Date(data.date).getFullYear()}-${(
      new Date(data.date).getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${new Date(data.date)
      .getDate()
      .toString()
      .padStart(2, '0')}`;

    // try {
    //   const response = await fetch(
    //     `${import.meta.env.VITE_API_URL}/search-trip?startX=${places
    //       ?.placesStart?.lat}&startY=${places?.placesStart?.lng}&endX=${places
    //       ?.placesEnd?.lat}&endY=${places?.placesEnd?.lng}&passenger=${
    //       data.passenger
    //     }&date=${date}`,
    //   ).then((res) => res.json());
    //   setSearchTripFilter(response);
    // } catch (error) {
    //   throw new Error(String(error));
    // }
  };
  const inputReferenceFrom = useRef<HTMLInputElement>(null);

  const onPlaceChangedFrom = (place: google.maps.places.PlaceResult) => {
    console.log('place ici');

    if (place) {
      if (place.formatted_address !== undefined && place.name !== undefined) {
        setValue('from', place.formatted_address || place.name);
      }
    }
    inputReferenceFrom.current && inputReferenceFrom.current.focus();
  };
  useAutocomplete({
    inputField: inputReferenceFrom.current,
    onPlaceChanged: onPlaceChangedFrom,
  });
  console.log('watch from', watch('from'));
  console.log('inputReferenceFrom', inputReferenceFrom.current?.value);

  const passengers = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <APIProvider
      apiKey={'AIzaSyCqmue-jTjbdPOQiH_CRwF_PXEaDjsnBMU'}
      libraries={['places']}
    >
      <div className='flex justify-center'>
        <div className=' text-primary flex w-[600px] items-center justify-center bg-black'>
          <form
            method='get'
            className='m-4 flex w-96 flex-col bg-slate-100 p-2'
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className='mt-8'>{'From'}</label>
            <input
              type='text'
              placeholder='Address start'
              {...register('from')}
              ref={inputReferenceFrom}
              className='mb-5 mt-1 w-full rounded-lg border p-2 drop-shadow'
            />
            <label className=''>{'To'}</label>
            <input
              type='text'
              placeholder='Address end'
              {...register('to')}
              className='mb-5 mt-1 w-full rounded-lg border p-2 drop-shadow'
            />
            <div className='flex justify-center'>
              <Controller
                control={control}
                name='date'
                render={({ field }) => (
                  <DatePicker
                    onChange={(date: Date) => {
                      field.onChange(date);
                    }}
                    selected={field.value}
                    inline
                    minDate={new Date()}
                    showTimeInput
                    className='w-full rounded-2xl border bg-orange-400'
                  />
                )}
              />
            </div>
            <div className='my-4 flex w-full items-center justify-center space-x-3'>
              <p>{'Passanger number : '}</p>
              <select
                {...register('passenger')}
                className='w-16 rounded-lg border-2 border-white bg-transparent p-2 text-center'
              >
                {passengers.map((passenger) => (
                  <option key={passenger} value={passenger}>
                    {passenger}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex w-full justify-center'>
              {' '}
              <button
                type='submit'
                className='bg-primary my-5 w-64 rounded-lg p-2 font-semibold text-white'
              >
                {'Search'}
              </button>
            </div>
          </form>
        </div>
        {/* <div className='space-y-4'>
          {searchTripFilter === undefined ? undefined : (
            <CardTrip searchTripFilter={searchTripFilter} />
          )}
        </div> */}
      </div>
    </APIProvider>
  );
}
