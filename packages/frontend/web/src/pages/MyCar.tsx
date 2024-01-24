import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface CarProfile {
  id: number;
  brand: string;
  model: string;
  plate_number: string;
  color: string;
  number_seat: string;
  photo: string;
}

export default function MyCar() {
  const [cars, setCars] = useState<CarProfile[]>([]);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/car`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'content-type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch car');
        }

        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error('Erreur lors de la requête:', error);
      }
    };

    fetchCar().catch((error) => {
      console.error('Erreur lors de la requête:', error);
    });
  }, []);
  return (
    <div className='md:mt-18 flex flex-col lg:mt-28 lg:flex-row-reverse lg:justify-around'>
      <Link to='/profile' className='w-7'>
        <img className='my-5 ms-5 w-4 sm:hidden' src='icons/arrow-left.svg' />
      </Link>
      <img
        className='m-auto my-10 hidden w-[80%] sm:mt-28 sm:block lg:w-[35rem]'
        src='icons/logo.svg'
      />
      <div className='flex justify-between sm:hidden'>
        <h1 className='my-10 ms-8 text-3xl font-extrabold text-white sm:hidden'>
          {'My cars'}
        </h1>
        <Link to='/add-car'>
          <img
            src='/icons/add-car.svg'
            alt='add-car'
            className='my-10 mr-6 h-8'
          />
        </Link>
      </div>
      <div className='mx-auto w-[85%] from-[#FFFFFF]/10 to-[#FFFFFF]/0 md:mt-10 md:w-[40%] md:rounded-[1.5rem] md:bg-gradient-to-br md:shadow-2xl lg:ms-auto lg:h-[40rem] lg:w-[35rem] lg:py-5'>
        <div className='hidden justify-between sm:flex'>
          <Link to='/profile'>
            <img
              src='/icons/arrow-left.svg'
              alt='arrow-left'
              className='my-5 ms-5 w-4'
            />
          </Link>
          <h1 className='my-10 ms-8 text-3xl font-extrabold text-white'>
            {'My Cars'}
          </h1>
          <Link to='/add-car'>
            <img
              src='/icons/add-car.svg'
              alt='add-car'
              className='my-10 mr-6 h-8'
            />
          </Link>
        </div>
        {Array.isArray(cars)
          ? cars.map((car) => (
              <React.Fragment key={car.id}>
                <div className='flex flex-row justify-between rounded-md bg-white text-black shadow-md sm:mx-auto sm:w-3/4'>
                  <p className='p-3 font-bold'>{car.model}</p>
                  <p className='p-3'>{car.plate_number}</p>
                  <img
                    src='/icons/green-arrow.svg'
                    alt='green-arrow'
                    className='pr-3'
                  />
                </div>
                <div className='mb-6 mt-4 w-full border border-white border-opacity-50 sm:mx-auto sm:w-3/4' />
              </React.Fragment>
            ))
          : undefined}
      </div>
    </div>
  );
}
