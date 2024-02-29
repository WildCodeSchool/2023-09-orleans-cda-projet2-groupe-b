import { zodResolver } from '@hookform/resolvers/zod';
import { useAutocomplete } from '@vis.gl/react-google-maps';
import { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';

import { type SearchTripType, searchTripSchema } from '@app/shared';
import type { DataSearchTrip } from '@app/types';

import CardTrip from '@/components/CardTrip';

interface PlaceStart {
  x: number | undefined;
  y: number | undefined;
}

interface PlaceEnd {
  x: number | undefined;
  y: number | undefined;
}

const passengers = [1, 2, 3, 4, 5, 6, 7, 8];

export default function SearchTrip() {
  const [placeStart, setPlaceStart] = useState<PlaceStart>();
  const [placeEnd, setPlaceEnd] = useState<PlaceEnd>();

  const [searchTripFilter, setSearchTripFilter] = useState<
    DataSearchTrip[] | undefined
  >();

  const {
    handleSubmit,
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SearchTripType>({
    defaultValues: { from: '', to: '' },
    resolver: zodResolver(searchTripSchema),
  });

  const inputReferenceFrom = useRef<HTMLInputElement>(null);
  const inputReferenceTo = useRef<HTMLInputElement>(null);

  const onPlaceChangedFrom = (place: google.maps.places.PlaceResult) => {
    if (place) {
      if (place.formatted_address !== undefined && place.name !== undefined) {
        setValue('from', place.formatted_address || place.name);
        const placeStart = {
          x: place.geometry?.location?.lat(),
          y: place.geometry?.location?.lng(),
        };
        setPlaceStart(placeStart);
      } else {
        return;
      }
    }
    inputReferenceFrom.current && inputReferenceFrom.current.focus();
  };

  useAutocomplete({
    inputField: inputReferenceFrom.current,
    onPlaceChanged: onPlaceChangedFrom,
  });

  const onPlaceChangedTo = (place: google.maps.places.PlaceResult) => {
    if (place) {
      if (place.formatted_address !== undefined && place.name !== undefined) {
        setValue('to', place.formatted_address || place.name);
        const placeEnd = {
          x: place.geometry?.location?.lat(),
          y: place.geometry?.location?.lng(),
        };
        setPlaceEnd(placeEnd);
      } else {
        return;
      }
    }
    inputReferenceTo.current && inputReferenceTo.current.focus();
  };

  useAutocomplete({
    inputField: inputReferenceTo.current,
    onPlaceChanged: onPlaceChangedTo,
  });

  const onSubmit = async (data: SearchTripType) => {
    const date = `${new Date(data.date).getFullYear()}-${(
      new Date(data.date).getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${new Date(data.date)
      .getDate()
      .toString()
      .padStart(2, '0')}`;
    try {
      const response = await fetch(
        `/api/search-trip?startX=${placeStart?.x}&startY=${placeStart?.y}&endX=${placeEnd?.x}&endY=${placeEnd?.y}&passenger=${data.passenger}&date=${date}`,
      ).then((res) => res.json());
      setSearchTripFilter(response);
      console.log(searchTripFilter);
    } catch (error) {
      throw new Error(String(error));
    }
  };

  return (
    <div className='mx-auto w-[85%] from-[#FFFFFF]/10 to-[#FFFFFF]/0 md:mb-4 md:mt-24 md:h-auto md:w-[60%] md:rounded-[1.5rem] md:bg-gradient-to-br md:shadow-2xl lg:ms-auto lg:mt-44 lg:w-[80%]'>
      <h1 className='text-bold mt-5 pt-4 text-center text-2xl sm:mt-20 md:mt-10'>
        {'Search Trip'}
      </h1>{' '}
      <div className='flex w-full justify-center'>
        <form
          method='get'
          className='flex w-96 flex-col lg:ms-[10%] lg:h-[30rem] lg:w-full lg:flex-row'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='lg:w-[30%]'>
            <div className='my-4'>
              <label>{'From'}</label>
              <input
                type='text'
                {...register('from')}
                onChange={(event) => {
                  setValue('from', event.target.value);
                }}
                value={watch('from')}
                ref={inputReferenceFrom}
                placeholder='Address start'
                className='text-dark w-full rounded-lg border p-2 drop-shadow '
              />
              <span className='text-red-700'>{errors.from?.message}</span>
            </div>
            <div className='my-4'>
              <label>{'To'}</label>
              <input
                type='text'
                {...register('to')}
                onChange={(event) => {
                  setValue('to', event.target.value);
                }}
                value={watch('to')}
                ref={inputReferenceTo}
                placeholder='Address end'
                className='text-dark w-full rounded-lg border p-2 drop-shadow'
              />
              <span className='text-red-700'>{errors.to?.message}</span>
            </div>
          </div>
          <div className='lg:flex lg:flex-row-reverse lg:justify-between'>
            <div className='mt-8 flex justify-center lg:-me-[50%] lg:h-72 lg:justify-end'>
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
                    className='w-full rounded-2xl border bg-orange-400'
                  />
                )}
              />
            </div>

            <div className='my-4 flex w-full items-center justify-center space-x-3 lg:-ms-[80%] lg:mt-10'>
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
          </div>
          <div className='lg:-ms-[28rem] lg:mb-5 lg:flex lg:items-end'>
            <div className='bg-light text-dark mt-5 h-10 w-full rounded text-center shadow-lg sm:mb-5 lg:mb-0 lg:w-96 lg:justify-center '>
              <button type='submit' className='my-1 text-xl font-semibold'>
                {'Search'}
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className='space-y-4'>
        {searchTripFilter === undefined ? undefined : (
          <CardTrip searchTripFilter={searchTripFilter} />
        )}
      </div>
    </div>
  );
}
