import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContext';
import {
  type ValidationLoginSchema,
  validationLoginSchema,
} from '@/schemas/validation-login-schema';

export default function Login() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationLoginSchema>({
    resolver: zodResolver(validationLoginSchema),
  });

  const onSubmit: SubmitHandler<ValidationLoginSchema> = async (data) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
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
    } catch {
      throw new Error('Erreur lors de la requête:');
    }
  };

  if (isLoggedIn) {
    return <Navigate to='/' />;
  }
  return (
    <div className='md:mt-18 flex flex-col lg:mt-28 lg:flex-row-reverse lg:justify-around'>
      <Link to='/' className='w-7'>
        <img
          className='my-5 ms-5 w-4 rotate-180 sm:hidden'
          src='icons/right-arrow.svg'
        />
      </Link>
      <img
        className='m-auto my-10 w-[80%] sm:mt-28 md:w-96 lg:w-[35rem]'
        src='icons/logo.svg'
      />
      <p className='my-10 ms-8 text-4xl font-extrabold text-white sm:hidden'>
        {'Welcome Back'}
      </p>
      <div className='mx-auto w-[85%] from-[#FFFFFF]/10 to-[#FFFFFF]/0 md:mt-10 md:w-[40%] md:rounded-lg md:bg-gradient-to-br md:shadow-lg lg:ms-auto lg:h-[40rem] lg:w-[35rem] lg:py-5'>
        <form
          className='md:mt-10 md:h-96 md:py-10 lg:my-[15%] lg:p-8'
          onSubmit={handleSubmit(onSubmit)}
        >
          {errors.email ? (
            <p className='ms-[10%] mt-2 italic text-red-500'>
              {errors.email.message}
            </p>
          ) : undefined}
          {errors.password ? (
            <p className='ms-[10%] mt-2 italic text-red-500'>
              {errors.password.message}
            </p>
          ) : undefined}
          <div className='mx-auto my-5 h-10 md:w-[80%]'>
            <input
              className={`w-full bg-transparent text-xl placeholder-white/100 ${
                errors.email && 'border-red-500'
              }`}
              type='email'
              placeholder='Email'
              {...register('email')}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />{' '}
            <div className='border border-b-white' />
          </div>
          <div className='mx-auto mt-5 h-10 md:w-[80%]'>
            <input
              className={`w-full bg-transparent text-xl placeholder-white/100 ${
                errors.password && 'border-red-500'
              }`}
              type='password'
              placeholder='Password'
              {...register('password')}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <div className='border border-b-white' />
          </div>
          <div className='text-end md:me-[10%]'>
            <p>{'forgot password ?'}</p>
          </div>
          <div className='m-auto my-7 h-10 rounded-lg bg-white text-center shadow-lg md:w-[80%]'>
            <button
              type='submit'
              className='my-1 text-xl font-semibold text-black'
            >
              {'Login'}
            </button>
          </div>
          <div className='mt-5 flex justify-end text-end md:me-[10%]'>
            <p className='px-5'>{'Not account ?'}</p>
            <Link to='/register' className='border-b border-white text-white'>
              {'Sign up'}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
