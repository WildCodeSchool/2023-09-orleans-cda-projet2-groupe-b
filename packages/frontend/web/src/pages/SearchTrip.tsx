import { zodResolver } from '@hookform/resolvers/zod';
import { useAutocomplete } from '@vis.gl/react-google-maps';
import { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';

import {
  type ResultSearchTripType,
  type SearchTripType,
  searchTripSchema,
} from '@app/types/src/search-trip-validation';

import CardTrip from '@/components/CardTrip';

interface PlaceStart {
  x: number | undefined;
  y: number | undefined;
}

interface PlaceEnd {
  x: number | undefined;
  y: number | undefined;
}

export default function SearchTrip() {
  const [placeStart, setPlaceStart] = useState<PlaceStart>();
  const [placeEnd, setPlaceEnd] = useState<PlaceEnd>();

  const [resultSearchTrip, setResultSearchTrip] = useState<
    ResultSearchTripType | undefined
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
        `${import.meta.env.VITE_API_URL}/search-trip?startX=${
          placeStart?.x
        }&startY=${placeStart?.y}&endX=${
          placeEnd?.x
        }&endY=${placeEnd?.y}&passenger=${data.passenger}&date=${date}`,
      ).then((res) => res.json());
      setResultSearchTrip(response);
    } catch (error) {
      throw new Error(String(error));
    }
  };

  const passengers = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className='flex justify-center'>
      <div className=' text-primary flex h-[750px] w-[600px] justify-center bg-black'>
        <form
          method='get'
          className='m-4 flex w-96 flex-col bg-slate-100 p-2'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='mt-8'>
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
              className='w-full rounded-lg border p-2 drop-shadow'
            />
            <span className='text-red-700'>{errors.from?.message}</span>
          </div>
          <div className='mt-4'>
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
              className='w-full rounded-lg border p-2 drop-shadow'
            />
            <span className='text-red-700'>{errors.to?.message}</span>
          </div>
          <div className='mt-8 flex justify-center'>
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
      <div className='space-y-4'>
        {resultSearchTrip === undefined ? undefined : (
          <CardTrip resultSearchTrip={resultSearchTrip} />
        )}
      </div>
    </div>
  );
}
