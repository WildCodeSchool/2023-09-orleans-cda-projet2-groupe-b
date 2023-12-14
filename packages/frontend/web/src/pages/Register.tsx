import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { useAuth } from '@/contexts/AuthContex';

export default function Login() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [birthdate, setBirthdate] = useState<Date | string>('');

  const isDateValid = (value: string | Date) => {
    const date = new Date(value);
    return !Number.isNaN(date.getTime());
  };

  const validationRegisterSchema = z
    .object({
      firstname: z
        .string()
        .trim()
        .min(1, { message: 'Firstname is required' })
        .max(100, { message: 'Should contain less than 100 characters' }),
      lastname: z
        .string()
        .trim()
        .min(1, { message: 'Lastname is required' })
        .max(100, { message: 'Should contain less than 100 characters' }),
      birthdate: z
        .string()
        .refine(isDateValid, { message: 'Invalid birthdate' }),
      email: z
        .string()
        .min(1, { message: 'Email is required' })
        .max(254, { message: 'Email must have less than 254 character' })
        .email({ message: 'Must be a valid email' })
        .trim(),
      password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters' })
        .trim(),
      confirmPassword: z
        .string()
        .min(1, { message: 'Confirm Password is required' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: "Password don't match",
    });

  type ValidationRegisterSchema = z.infer<typeof validationRegisterSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationRegisterSchema>({
    resolver: zodResolver(validationRegisterSchema),
  });

  const onSubmit: SubmitHandler<ValidationRegisterSchema> = async (data) => {
    try {
      const res = await fetch('http://10.0.28.96:3333/api/auth/register', {
        method: 'POST',
        credentials: 'include',
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
    } catch {
      throw new Error('Erreur lors de la requête:');
    }
  };

  if (isLoggedIn) {
    return <Navigate to='/' />;
  }
  return (
    <div className='flex flex-col md:mt-20 lg:mt-28 lg:flex-row-reverse lg:justify-around'>
      <img
        className='m-auto my-10 w-[80%] sm:mt-28 md:w-96 lg:w-[35rem]'
        src='icons/logo.svg'
      />
      <div className='mx-auto w-[85%] from-[#FFFFFF]/10 to-[#FFFFFF]/0 md:mt-10 md:w-[40%] md:rounded-lg md:bg-gradient-to-br md:shadow-lg lg:ms-auto lg:h-[40rem] lg:w-[35rem] '>
        <form
          className='md:mt-10  lg:my-[8%] lg:p-8'
          onSubmit={handleSubmit(onSubmit)}
        >
          {errors.firstname ? (
            <p className='ms-[10%] mt-2 italic text-red-500'>
              {errors.firstname.message}
            </p>
          ) : undefined}
          {errors.lastname ? (
            <p className='ms-[10%] mt-2 italic text-red-500'>
              {errors.lastname.message}
            </p>
          ) : undefined}
          {errors.birthdate ? (
            <p className='ms-[10%] mt-2 italic text-red-500'>
              {errors.birthdate.message}
            </p>
          ) : undefined}
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
          {errors.confirmPassword ? (
            <p className='ms-[10%] mt-2 italic text-red-500'>
              {errors.confirmPassword.message}
            </p>
          ) : undefined}

          <div className='mx-auto my-5 h-10 text-white md:w-[80%]'>
            <input
              className={`w-full bg-transparent text-xl placeholder-white/100 ${
                errors.firstname && 'border-red-500'
              }`}
              type='text'
              placeholder='firstname'
              {...register('firstname')}
              value={firstname}
              onChange={(event) => {
                setFirstname(event.target.value);
              }}
            />
            <div className='border border-b-white' />
          </div>
          <div className='mx-auto mt-5 h-10 text-white md:w-[80%]'>
            <input
              className={`w-full bg-transparent text-xl placeholder-white/100 ${
                errors.lastname && 'border-red-500'
              }`}
              type='text'
              placeholder='lastname'
              {...register('lastname')}
              value={lastname}
              onChange={(event) => {
                setLastname(event.target.value);
              }}
            />
            <div className='border border-b-white' />
          </div>
          <div className='mx-auto mt-5 h-10 text-white md:w-[80%]'>
            <input
              className={`w-full bg-transparent text-xl placeholder-white/100 ${
                errors.birthdate && 'border-red-500'
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
            <div className='mb border border-b-white' />
          </div>
          <div className='mx-auto mt-10 h-10 text-white md:w-[80%]'>
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
            />
            <div className='border border-b-white' />
          </div>
          <div className='mx-auto mt-5 h-10 text-white md:w-[80%]'>
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
          <div className='mx-auto mt-5 h-10 text-white md:w-[80%]'>
            <input
              className={`w-full bg-transparent text-xl placeholder-white/100 ${
                errors.confirmPassword && 'border-red-500'
              }`}
              type='password'
              placeholder='Confirm password'
              {...register('confirmPassword')}
            />
            <div className='border border-b-white' />
          </div>

          <div className='m-auto my-10 h-10 rounded bg-white text-center shadow-lg md:mb-10 md:w-[80%]'>
            <button type='submit' className='my-1 text-xl font-semibold'>
              {'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
