import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';

import type { Car } from '@app/types';

import { validationCarSchema } from '@/schemas/validation-car-schema';

export default function EditCar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const array = [2, 3, 4, 5, 6, 7, 8, 9];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Car>({
    resolver: zodResolver(validationCarSchema),
  });

  useEffect(() => {
    // Récupérer les informations de la voiture
    fetch(`${import.meta.env.VITE_API_URL}/car/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setValue('brand', data.brand);
        setValue('model', data.model);
        setValue('photo', data.photo);
        setValue('number_seat', data.number_seat);
        setValue('color', data.color);
        setValue('plate_number', data.plate_number);
      })
      .catch((error) => {
        console.error('Failed to fetch car:', error);
      });
  }, [id]);

  const onSubmit: SubmitHandler<Car> = async (data) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/car/edit/${id}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            ...data,
          }),
        },
      );
      const resData = (await res.json()) as {
        ok: boolean;
      };

      if (resData.ok) {
        navigate('/my-car');
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  };

  const onDelete = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/car/delete/${id}`,
        {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'content-type': 'application/json',
          },
        },
      );
      const resData = (await res.json()) as {
        ok: boolean;
      };

      if (resData.ok) {
        navigate('/my-car');
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  };

  return (
    <div className='md:mt-18 mt-5 flex min-h-screen flex-col lg:mt-28 lg:flex-row-reverse lg:justify-around'>
      <Link to='/my-car' className='w-7'>
        <img
          className='my-[4%] ms-5 w-4 sm:hidden'
          src='/icons/arrow-left.svg'
        />
      </Link>
      <div className='flex justify-between sm:hidden'>
        <h1 className='ms-8 mt-[7%] text-2xl font-extrabold text-white sm:hidden'>
          {'Modify informations'}
        </h1>
        <button onClick={onDelete} className='mr-7 mt-7 h-7'>
          {' '}
          <img src='/icons/green-trash.svg' alt='green trash' />
        </button>
      </div>
      <div className='mx-auto w-[85%] from-[#FFFFFF]/10 to-[#FFFFFF]/0 md:mt-10 md:w-[40%] md:rounded-[1.5rem] md:bg-gradient-to-br md:shadow-2xl lg:ms-auto lg:h-[40rem] lg:w-[35rem] lg:py-5'>
        <Link to='/my-car' className='w-7'>
          <img
            className='my-[4%] ms-12 hidden w-4 sm:block'
            src='/icons/arrow-left.svg'
          />
        </Link>
        <div className='hidden sm:flex sm:flex-row sm:justify-between'>
          <h1 className='text-bold ms-[10%] text-2xl sm:mt-20 md:mt-3'>
            {'Modify a car'}
          </h1>
          <button onClick={onDelete} className='mr-7 mt-7 h-7'>
            <img src='/icons/green-trash.svg' alt='green trash' />
          </button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='md:mt-2 md:py-3 lg:my-2 lg:h-96 lg:p-4'
        >
          <div className='mx-auto my-5 h-10 md:w-[80%]'>
            <input
              type='text'
              className={`w-full bg-transparent text-xl placeholder-white/100 ${
                errors.brand && 'border-red-500'
              }`}
              placeholder='Brand'
              {...register('brand')}
            />
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
            />
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
            />
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
            />
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
            </label>
            <select
              className={`w-full bg-transparent text-xl placeholder-white/100 ${
                errors.number_seat && 'border-red-500'
              }`}
              {...register('number_seat')}
            >
              {array.map((number) => (
                <React.Fragment key={number}>
                  <option value={number}>{number}</option>
                </React.Fragment>
              ))}
            </select>
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
            />
            <div className='border border-b-white' />
            {errors.photo ? (
              <p className='ms-[10%] mt-2 italic text-red-500'>
                {errors.photo.message}
              </p>
            ) : undefined}
          </div>
          <div className='m-auto my-7  rounded-lg bg-white text-center shadow-lg md:w-[80%]'>
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
