import { useAutocomplete } from '@vis.gl/react-google-maps';
import { useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import {
  type SearchPublishTripType,
  searchPublishTripSchema,
} from '@app/shared';

const KEY = import.meta.env.VITE_REACT_GOOGLE_MAPS_API_KEY;

if (KEY === undefined) {
  throw new Error('Key google maps is undefined');
}

export default function Search() {
  const {
    register,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<SearchPublishTripType>();
  const { fields, append, remove } = useFieldArray({
    name: 'checkpoint',
    control,
  });

  const inputReferenceFrom = useRef<HTMLInputElement>(null);
  const inputReferenceTo = useRef<HTMLInputElement>(null);

  watch('from');
  watch('to');

  const onPlaceChangedFrom = (place: google.maps.places.PlaceResult) => {
    if (place) {
      if (place.formatted_address !== undefined && place.name !== undefined) {
        setValue('from', place.formatted_address || place.name);
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

  return (
    <div className='flex justify-center'>
      <div className='flex w-96 flex-col space-y-4 p-6'>
        <div className='flex flex-col'>
          <label>{'From'}</label>
          <input
            type='text'
            {...register('from', {
              validate: (value) => {
                const result =
                  searchPublishTripSchema.shape.from.safeParse(value);
                return result.success ? true : result.error.errors[0]?.message;
              },
            })}
            onChange={(event) => {
              setValue('from', event.target.value);
            }}
            value={getValues('from')}
            ref={inputReferenceFrom}
            placeholder='Address start'
            className='w-full rounded-lg border p-2 drop-shadow'
          />
          <span className='text-red-700'>{errors.from?.message}</span>
        </div>
        {fields.map((field, index) => (
          <div key={field.id} className='flex flex-col'>
            <label>
              {'Checkpoint '}
              {index + 1}
            </label>
            <div className='flex flex-row justify-between space-x-2'>
              <input
                type='text'
                {...register(`checkpoint.${index}.address`, {
                  validate: (value) => {
                    const result =
                      searchPublishTripSchema.shape.checkpoint.safeParse([
                        { address: value, name: '' },
                      ]);
                    return result.success
                      ? true
                      : result.error.errors[0]?.message;
                  },
                })}
                placeholder={`Address checkpoint ${index + 1}`}
                className='w-full rounded-lg border p-2 drop-shadow'
              />

              <span
                onClick={() => {
                  remove(index);
                }}
                className='flex cursor-pointer items-end justify-center rounded-lg border p-2'
              >
                <img
                  src='/icons/checkpoint-delete.svg'
                  className='h-full w-full'
                />
              </span>
            </div>
            <span className='text-red-700'>
              {errors.checkpoint?.[index]?.address?.message}
            </span>
          </div>
        ))}
        <span
          onClick={() => {
            append({ name: '', address: '' });
          }}
          className='flex w-44 cursor-pointer items-center justify-between rounded-full border-2 p-1 ps-3'
        >
          {'Add checkpoint'} <img src='/icons/checkpoint-add.svg' />
        </span>
        <div className='flex flex-col'>
          <label>{'To'}</label>
          <input
            type='text'
            {...register('to', {
              validate: (value) => {
                const result =
                  searchPublishTripSchema.shape.to.safeParse(value);
                return result.success ? true : result.error.errors[0]?.message;
              },
            })}
            onChange={(event) => {
              setValue('to', event.target.value);
            }}
            value={getValues('to')}
            ref={inputReferenceTo}
            placeholder='Address destination'
            className='w-full rounded-lg border p-2 drop-shadow'
          />
          <span className='text-red-700'>{errors.to?.message}</span>
        </div>
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
      </div>
    </div>
  );
}
