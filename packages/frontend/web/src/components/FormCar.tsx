import { zodResolver } from '@hookform/resolvers/zod';
import { Fragment, useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';

import type { Car } from '@app/types';

import { validationCarSchema } from '@/schemas/validation-car-schema';

const numberSeat = [2, 3, 4, 5, 6, 7, 8, 9];
export default function FormCar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Car>({
    resolver: zodResolver(validationCarSchema),
  });

  useEffect(() => {
    if (id) {
      fetch(`/api/car/${id}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      })
        .then((res) => res.json())
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
    }
  }, [id]);

  const onSubmit: SubmitHandler<Car> = async (data) => {
    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/car/${id}` : `/api/car/add`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
        }),
      });
      const resData = (await res.json()) as {
        ok: boolean;
      };

      if (resData.ok) {
        navigate('/cars');
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  };

  const onDelete = async () => {
    try {
      const res = await fetch(`/api/car/${id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
      });
      const resData = (await res.json()) as {
        ok: boolean;
      };

      if (resData.ok) {
        navigate('/cars');
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  };
  return (
    <div className='md:mt-18 mt-5 flex min-h-screen flex-col lg:mt-28 lg:flex-row-reverse lg:justify-around'>
      <Link to='/cars' className='w-7'>
        <img
          className='my-[4%] ms-5 w-4 sm:hidden'
          src='/icons/arrow-left.svg'
        />
      </Link>
      <div className='flex justify-between sm:hidden'>
        <h1 className='text-light ms-8 mt-[7%] text-3xl font-extrabold sm:hidden'>
          {id ? 'Modify a car' : 'Add a car'}
        </h1>
        {id ? (
          <button onClick={onDelete} className='mr-7 mt-7 h-7'>
            <img src='/icons/green-trash.svg' alt='green trash' />
          </button>
        ) : undefined}
      </div>
      <div className='mx-auto w-full max-w-[500px] from-[#FFFFFF]/10 to-[#FFFFFF]/0 px-5 md:mt-40  md:rounded-[1.5rem] md:bg-gradient-to-br md:shadow-2xl lg:ms-auto lg:mt-0 lg:h-[40rem] lg:py-5'>
        <Link to='/cars' className='w-7'>
          <img
            className='my-[4%] ms-12 hidden w-4 sm:block'
            src='/icons/arrow-left.svg'
          />
        </Link>
        <div className='hidden sm:flex sm:flex-row sm:justify-between'>
          <h1 className='ms-[10%] text-3xl font-extrabold sm:mt-20 md:mt-3'>
            {id ? 'Modify a car' : 'Add a car'}
          </h1>
          {id ? (
            <button onClick={onDelete} className='mr-7 mt-7 h-7'>
              <img src='/icons/green-trash.svg' alt='green trash' />
            </button>
          ) : undefined}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='md:mt-2 md:py-3 lg:my-2 lg:h-96 lg:p-4'
        >
          <div className='mx-auto my-5 h-7 md:w-[80%]'>
            <input
              type='text'
              className={`placeholder-light w-full bg-transparent text-xl ${
                errors.brand && 'border-danger'
              }`}
              placeholder='Brand'
              {...register('brand')}
            />
            <div className='border-b-light border' />
            {errors.brand ? (
              <p className='text-danger ms-[10%] mt-2 italic'>
                {errors.brand.message}
              </p>
            ) : undefined}
          </div>
          <div className='mx-auto my-5 h-7 md:w-[80%]'>
            <input
              type='text'
              className={`placeholder-light w-full bg-transparent text-xl ${
                errors.model && 'border-danger'
              }`}
              placeholder='Model'
              {...register('model')}
            />
            <div className='border-b-light border' />
            {errors.model ? (
              <p className='text-danger ms-[10%] mt-2 italic'>
                {errors.model.message}
              </p>
            ) : undefined}
          </div>
          <div className='mx-auto mb-5 h-7 md:w-[80%]'>
            <input
              type='text'
              className={`placeholder-light w-full bg-transparent text-xl ${
                errors.plate_number && 'border-danger'
              }`}
              placeholder='plate_number'
              {...register('plate_number')}
            />
            <div className='border-b-light border' />
            {errors.plate_number ? (
              <p className='text-danger ms-[10%] mt-2 italic'>
                {errors.plate_number.message}
              </p>
            ) : undefined}
          </div>

          <div className='mx-auto h-16 md:w-[80%]'>
            <label htmlFor='color' className='text-xl'>
              {'color'}
            </label>
            <input
              type='color'
              className={`placeholder-light w-full bg-transparent text-xl ${
                errors.color && 'border-danger'
              }`}
              {...register('color')}
            />
            {errors.color ? (
              <p className='text-danger ms-[10%] mt-2 italic'>
                {errors.color.message}
              </p>
            ) : undefined}
          </div>
          <div className='mx-auto mb-10 h-7 md:w-[80%]'>
            <label htmlFor='places' className='mb-6 text-xl'>
              {'Numbers of places'}
            </label>
            <select
              className={`placeholder-light w-full bg-transparent text-xl ${
                errors.number_seat && 'border-danger'
              }`}
              {...register('number_seat')}
            >
              {numberSeat.map((number) => (
                <Fragment key={number}>
                  <option value={number}>{number}</option>
                </Fragment>
              ))}
            </select>
            <div className='border-b-light mb-10 border' />
            {errors.number_seat ? (
              <p className='text-danger ms-[10%] mt-2 italic'>
                {errors.number_seat.message}
              </p>
            ) : undefined}
          </div>
          <div className='mx-auto mb-16 h-7 md:w-[80%]'>
            <label htmlFor='picture' className='text-xl'>
              {'Picture'}
            </label>
            <input
              type='file'
              className={`placeholder-light mb-1 w-full bg-transparent text-xl ${
                errors.photo && 'border-danger'
              }`}
              {...register('photo')}
            />
            <div className='border-b-light border' />
            {errors.photo ? (
              <p className='text-danger ms-[10%] mt-2 italic'>
                {errors.photo.message}
              </p>
            ) : undefined}
          </div>
          <div className='bg-light m-auto my-5 rounded-lg text-center shadow-lg md:w-[80%]'>
            <button
              type='submit'
              className='text-dark my-1 text-xl font-semibold'
            >
              {id ? 'Modify' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
