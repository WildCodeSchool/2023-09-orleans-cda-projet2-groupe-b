import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import {
  type ValidationCarSchema,
  validationCarSchema,
} from '@/schemas/validation-car-schema';

export default function AddACar() {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [color, setColor] = useState('');
  const [numberSeat, setNumberSeat] = useState('');
  const [photo, setPhoto] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationCarSchema>({
    resolver: zodResolver(validationCarSchema),
  });
  const onSubmit: SubmitHandler<ValidationCarSchema> = async (data) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/car/add`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          brand: data.brand,
          model: data.model,
          plate_number: data.plate_number,
          color: data.color,
          number_seat: data.number_seat,
          photo: data.photo,
        }),
      });
      const resData = (await res.json()) as {
        ok: boolean;
      };

      if (resData.ok) {
        navigate('/my-car');
      }
    } catch {
      throw new Error('Erreur lors de la requête:');
    }
  };
  return (
    <div className='md:mt-18 flex flex-col lg:mt-28 lg:flex-row-reverse lg:justify-around'>
      <Link to='/profile' className='w-7'>
        <img className='my-5 ms-5 w-4 sm:hidden' src='icons/arrow-left.svg' />
      </Link>
      <img
        className='m-auto my-10 hidden w-[80%] sm:mt-28 sm:block lg:w-[35rem]'
        src='icons/logo.svg'
      />
      <h1 className='my-4 ms-8 text-3xl font-extrabold text-white sm:hidden'>
        {'Add a car'}
      </h1>
      <div className='mx-auto w-[85%] from-[#FFFFFF]/10 to-[#FFFFFF]/0 md:mt-10 md:w-[40%] md:rounded-[1.5rem] md:bg-gradient-to-br md:shadow-2xl lg:ms-auto lg:h-[40rem] lg:w-[35rem] lg:py-5'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='md:mt-10 md:h-96 md:py-10 lg:my-[15%] lg:p-8'
        >
          <div className='mx-auto my-5 h-10 md:w-[80%]'>
            <input
              type='text'
              className={`w-full bg-transparent text-xl placeholder-white/100 ${
                errors.brand && 'border-red-500'
              }`}
              placeholder='Brand'
              {...register('brand')}
              value={brand}
              onChange={(event) => {
                setBrand(event.target.value);
              }}
            />{' '}
            <div className='border border-b-white' />
            {errors.brand ? (
              <p className='ms-[10%] mt-2 italic text-red-500'>
                {errors.brand.message}
              </p>
            ) : undefined}
          </div>
          <div className='mx-auto my-5 h-10 md:w-[80%]'>
            <input
              type='text'
              className={`w-full bg-transparent text-xl placeholder-white/100 ${
                errors.model && 'border-red-500'
              }`}
              placeholder='Model'
              {...register('model')}
              value={model}
              onChange={(event) => {
                setModel(event.target.value);
              }}
            />{' '}
            <div className='border border-b-white' />
            {errors.model ? (
              <p className='ms-[10%] mt-2 italic text-red-500'>
                {errors.model.message}
              </p>
            ) : undefined}
          </div>
          <div className='mx-auto my-5 h-10 md:w-[80%]'>
            <input
              type='text'
              className={`w-full bg-transparent text-xl placeholder-white/100 ${
                errors.plate_number && 'border-red-500'
              }`}
              placeholder='plate_number'
              {...register('plate_number')}
              value={plateNumber}
              onChange={(event) => {
                setPlateNumber(event.target.value);
              }}
            />{' '}
            <div className='border border-b-white' />
            {errors.plate_number ? (
              <p className='ms-[10%] mt-2 italic text-red-500'>
                {errors.plate_number.message}
              </p>
            ) : undefined}
          </div>

          <div className='mx-auto my-5 h-10 md:w-[80%]'>
            <label htmlFor='color'>{'color'}</label>
            <input
              type='color'
              className={`w-full bg-transparent text-xl placeholder-white/100 ${
                errors.color && 'border-red-500'
              }`}
              {...register('color')}
              value={color}
              onChange={(event) => {
                setColor(event.target.value);
              }}
            />{' '}
            <div className='border border-b-white' />
            {errors.color ? (
              <p className='ms-[10%] mt-2 italic text-red-500'>
                {errors.color.message}
              </p>
            ) : undefined}
          </div>
          <div className='mx-auto my-5 h-10 md:w-[80%]'>
            <label htmlFor='places' className='mb-6'>
              {'Numbers of places'}
            </label>{' '}
            <select
              className={`w-full bg-transparent text-xl placeholder-white/100 ${
                errors.number_seat && 'border-red-500'
              }`}
              {...register('number_seat')}
              value={numberSeat}
              onChange={(event) => {
                setNumberSeat(event.target.value);
              }}
            >
              <option value='2'>{'2'}</option>
              <option value='3'>{'3'}</option>
              <option value='4'>{'4'}</option>
              <option value='5'>{'5'}</option>
              <option value='6'>{'6'}</option>
              <option value='7'>{'8'}</option>
              <option value='9'>{'9'}</option>
            </select>{' '}
            <div className='border border-b-white' />
            {errors.number_seat ? (
              <p className='ms-[10%] mt-2 italic text-red-500'>
                {errors.number_seat.message}
              </p>
            ) : undefined}
          </div>
          <div className='mx-auto my-5 h-10 md:w-[80%]'>
            <label htmlFor='picture'>{'Picture'}</label>
            <input
              type='file'
              className={`w-full bg-transparent text-xl placeholder-white/100 ${
                errors.photo && 'border-red-500'
              }`}
              {...register('photo')}
              value={photo}
              onChange={(event) => {
                setPhoto(event.target.value);
              }}
            />{' '}
            <div className='border border-b-white' />
            {errors.photo ? (
              <p className='ms-[10%] mt-2 italic text-red-500'>
                {errors.photo.message}
              </p>
            ) : undefined}
          </div>
          <div className='m-auto my-7 h-10 rounded-lg bg-white text-center shadow-lg md:w-[80%]'>
            <button
              type='submit'
              className='my-1 text-xl font-semibold text-black'
            >
              {'Add a car'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
