import { Controller, useFormContext } from 'react-hook-form';

export default function SeatPrice() {
  const {control, setValue, watch } = useFormContext();

  const handleIncrement = () => {
    const current = watch('price');
    setValue('price', current + 1);
  };

  const handleDecrement = () => {
    const current = watch('price');
    setValue('price', current - 1);
  };

  return (
    <div className='bg-slate-100 p-4 flex flex-col items-center space-y-4'>
      <label>{"Price of the place"}</label>
      <div className='flex space-x-4'>
        <button
          type='button'
          onClick={handleDecrement}
          className='bg-slate-100 p-4'
        >
          {"-"}
        </button>
        <Controller
          name='price'
          control={control}
          defaultValue={0}
          render={({ field }) => <input type='number' {...field} className='text-center' />}
          
        />
        <button
          type='button'
          onClick={handleIncrement}
          className='bg-slate-100 p-4'
        >
          {"+"}
        </button>
      </div>
    </div>
  );
}
