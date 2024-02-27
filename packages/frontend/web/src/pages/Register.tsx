import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContext';
import {
  type ValidationRegisterSchema,
  validationRegisterSchema,
} from '@/schemas/validation-register-schema.ts';

export default function Login() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [birthdate, setBirthdate] = useState<Date | string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationRegisterSchema>({
    resolver: zodResolver(validationRegisterSchema),
  });

  const onSubmit: SubmitHandler<ValidationRegisterSchema> = async (data) => {
    try {
      const res = await fetch(`/api/auth/register`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          firstname: data.firstname,
          lastname: data.lastname,
          birthdate: data.birthdate,
          email: data.email,
          password: data.password,
        }),
      });

      const resData = (await res.json()) as {
        isLoggedIn: boolean;
      };

      if (resData.isLoggedIn) {
        setIsLoggedIn(true);
        navigate('/');
      }
    } catch (error) {
      console.error('Error during request', error);
    }
  };

  if (isLoggedIn) {
    return <Navigate to='/' />;
  }
  return (
    <div className='flex flex-col md:mt-20 lg:mt-28 lg:flex-row-reverse lg:justify-around'>
      <img
        className='m-auto my-10 w-[80%] sm:mt-28 lg:w-[35rem]'
        src='icons/logo.svg'
      />
      <div className='mx-auto w-[85%] from-[#FFFFFF]/10 to-[#FFFFFF]/0 md:mt-10 md:w-[40%] md:rounded-[1.5rem] md:bg-gradient-to-br md:shadow-2xl lg:ms-auto lg:h-[40rem] lg:w-[35rem] '>
        <form
          className='md:mt-10  lg:my-[8%] lg:p-8'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='mx-auto my-5 h-10 md:w-[80%]'>
            <input
              className={`placeholder-light w-full bg-transparent text-xl ${
                errors.firstname && 'border-danger'
              }`}
              type='text'
              placeholder='firstname'
              {...register('firstname')}
              value={firstname}
              onChange={(event) => {
                setFirstname(event.target.value);
              }}
            />
            <div className='border-b-light border' />
            {errors.firstname ? (
              <p className='text-danger ms-[10%] mt-2 italic'>
                {errors.firstname.message}
              </p>
            ) : undefined}
          </div>
          <div className='mx-auto mt-5 h-10 md:w-[80%]'>
            <input
              className={`placeholder-light w-full bg-transparent text-xl ${
                errors.lastname && 'border-danger'
              }`}
              type='text'
              placeholder='lastname'
              {...register('lastname')}
              value={lastname}
              onChange={(event) => {
                setLastname(event.target.value);
              }}
            />
            <div className='border-b-light border' />
            {errors.lastname ? (
              <p className='text-danger ms-[10%] mt-2 italic'>
                {errors.lastname.message}
              </p>
            ) : undefined}
          </div>
          <div className='mx-auto mt-5 h-10 md:w-[80%]'>
            <input
              className={`placeholder-light w-full bg-transparent text-xl ${
                errors.birthdate && 'border-danger'
              }`}
              type='date'
              placeholder='birthdate'
              {...register('birthdate')}
              value={
                typeof birthdate === 'string'
                  ? birthdate
                  : birthdate.toISOString().split('T')[0]
              }
              onChange={(event) => {
                setBirthdate(event.target.value);
              }}
            />
            <div className='mb border-b-light border' />
            {errors.birthdate ? (
              <p className='text-danger ms-[10%] mt-2 italic'>
                {errors.birthdate.message}
              </p>
            ) : undefined}
          </div>
          <div className='mx-auto mt-10 h-10 md:w-[80%]'>
            <input
              className={`placeholder-light w-full bg-transparent text-xl ${
                errors.email && 'border-danger'
              }`}
              type='email'
              placeholder='Email'
              {...register('email')}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <div className='border-b-light border' />
            {errors.email ? (
              <p className='text-danger ms-[10%] mt-2 italic'>
                {errors.email.message}
              </p>
            ) : undefined}
          </div>
          <div className='mx-auto mt-5 h-10 md:w-[80%]'>
            <input
              className={`placeholder-light w-full bg-transparent text-xl ${
                errors.password && 'border-danger'
              }`}
              type='password'
              placeholder='Password'
              {...register('password')}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <div className='border-b-light border' />
            {errors.password ? (
              <p className='text-danger ms-[10%] mt-2 italic'>
                {errors.password.message}
              </p>
            ) : undefined}
          </div>
          <div className='mx-auto mt-5 h-10 md:w-[80%]'>
            <input
              className={`placeholder-light w-full bg-transparent text-xl ${
                errors.confirmPassword && 'border-danger'
              }`}
              type='password'
              placeholder='Confirm password'
              {...register('confirmPassword')}
            />
            <div className='border-b-light border' />
            {errors.confirmPassword ? (
              <p className='text-danger ms-[10%] mt-2 italic'>
                {errors.confirmPassword.message}
              </p>
            ) : undefined}
          </div>
          <div className='bg-light text-dark m-auto my-10 h-10 rounded text-center shadow-lg md:mb-10 md:w-[80%]'>
            <button type='submit' className='my-1 text-xl font-semibold'>
              {'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
