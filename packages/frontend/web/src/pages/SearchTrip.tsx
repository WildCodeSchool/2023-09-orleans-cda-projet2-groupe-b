import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';

interface FromSearchTrip {
  from: string;
  to: string;
  date: Date;
  passenger: number;
}
export default function SearchTrip() {
  const { handleSubmit, register, control } = useForm<FromSearchTrip>();

  const onSubmit = (data: FromSearchTrip) => {
    console.log(data);
  };
  const passengers = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className='flex justify-center'>
      <div className=' text-primary flex w-[600px] items-center justify-center bg-black'>
        <form
          action=''
          method='get'
          className='m-4 flex w-96 flex-col bg-slate-100 p-2'
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className='mt-8'>{'From'}</label>
          <input
            type='text'
            placeholder='Address start'
            {...register('from')}
            className='mb-5 mt-1 rounded-lg border p-2 drop-shadow'
          />
          <label className=''>{'To'}</label>
          <input
            type='text'
            placeholder='Address end'
            {...register('to')}
            className='mb-5 mt-1 rounded-lg border p-2 drop-shadow'
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
    </div>
  );
}
