import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import {
  type SearchPublishTripType,
  searchPublishTripSchema,
} from '@app/shared';

export default function Search() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<SearchPublishTripType>();
  const { fields, append, remove } = useFieldArray({
    name: 'checkpoint',
    control,
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
            placeholder='Address start'
            className='rounded-lg border p-2 drop-shadow'
          />
          <span className='text-red-700'>{errors.from?.message}</span>
        </div>
        {fields.map((field, index) => (
          <div key={field.id} className='flex flex-col'>
            <label>
              {'Checkpoint '}
              {index + 1}
            </label>
            <div className='flex flex-row space-x-2'>
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
                className='flex cursor-pointer items-center justify-center rounded-lg border p-2'
              >
                <svg
                  width='26'
                  height='28'
                  viewBox='0 0 22 24'
                  fill='black'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M4.33337 24C3.60004 24 2.97204 23.7387 2.44937 23.216C1.92671 22.6933 1.66582 22.0658 1.66671 21.3333V4H0.333374V1.33333H7.00004V0H15V1.33333H21.6667V4H20.3334V21.3333C20.3334 22.0667 20.072 22.6947 19.5494 23.2173C19.0267 23.74 18.3992 24.0009 17.6667 24H4.33337ZM17.6667 4H4.33337V21.3333H17.6667V4ZM7.00004 18.6667H9.66671V6.66667H7.00004V18.6667ZM12.3334 18.6667H15V6.66667H12.3334V18.6667Z'
                    fill='black'
                  />
                </svg>
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
          {'Add checkpoint'}{' '}
          <svg
            width='30'
            height='30'
            viewBox='0 0 28 28'
            fill='black'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12.6666 15.3333V19.3333C12.6666 19.7111 12.7946 20.028 13.0506 20.284C13.3066 20.54 13.6231 20.6675 14 20.6666C14.3777 20.6666 14.6946 20.5386 14.9506 20.2826C15.2066 20.0266 15.3342 19.7102 15.3333 19.3333V15.3333H19.3333C19.7111 15.3333 20.028 15.2053 20.284 14.9493C20.54 14.6933 20.6675 14.3768 20.6666 14C20.6666 13.6222 20.5386 13.3053 20.2826 13.0493C20.0266 12.7933 19.7102 12.6657 19.3333 12.6666H15.3333V8.66663C15.3333 8.28885 15.2053 7.97196 14.9493 7.71596C14.6933 7.45996 14.3768 7.3324 14 7.33329C13.6222 7.33329 13.3053 7.46129 13.0493 7.71729C12.7933 7.97329 12.6657 8.28974 12.6666 8.66663V12.6666H8.66663C8.28885 12.6666 7.97196 12.7946 7.71596 13.0506C7.45996 13.3066 7.3324 13.6231 7.33329 14C7.33329 14.3777 7.46129 14.6946 7.71729 14.9506C7.97329 15.2066 8.28974 15.3342 8.66663 15.3333H12.6666ZM14 27.3333C12.1555 27.3333 10.4222 26.9831 8.79996 26.2826C7.17774 25.5822 5.76663 24.6324 4.56663 23.4333C3.36663 22.2333 2.41685 20.8222 1.71729 19.2C1.01774 17.5777 0.667515 15.8444 0.666626 14C0.666626 12.1555 1.01685 10.4222 1.71729 8.79996C2.41774 7.17774 3.36752 5.76663 4.56663 4.56663C5.76663 3.36663 7.17774 2.41685 8.79996 1.71729C10.4222 1.01774 12.1555 0.667515 14 0.666626C15.8444 0.666626 17.5777 1.01685 19.2 1.71729C20.8222 2.41774 22.2333 3.36752 23.4333 4.56663C24.6333 5.76663 25.5835 7.17774 26.284 8.79996C26.9844 10.4222 27.3342 12.1555 27.3333 14C27.3333 15.8444 26.9831 17.5777 26.2826 19.2C25.5822 20.8222 24.6324 22.2333 23.4333 23.4333C22.2333 24.6333 20.8222 25.5835 19.2 26.284C17.5777 26.9844 15.8444 27.3342 14 27.3333Z'
              fill='gray'
            />
          </svg>
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
            placeholder='Address destination'
            className='rounded-lg border p-2 drop-shadow'
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
