import { useState } from 'react';
import { Link } from 'react-router-dom';

import arrowDown from '../assets/icons/arrow-down.svg';
import home from '../assets/icons/home.svg';
import logo from '../assets/icons/logo.svg';
import message from '../assets/icons/message.svg';
import profil from '../assets/icons/profil.svg';
import publish from '../assets/icons/publish.svg';
import rightArrow from '../assets/icons/right-arrow.svg';
import trip from '../assets/icons/trip.svg';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='fixed bottom-0 mb-2 ml-8 mr-8 flex w-80 flex-row justify-start rounded-full border-solid bg-[#008689] duration-75 sm:top-0 sm:mx-0 sm:h-16 sm:w-full sm:justify-between sm:rounded-none'>
      <div className='ml-12 mr-3 mt-5 duration-75 sm:mt-2 sm:w-[20%] md:mt-2 md:w-[10%]'>
        <Link to={'/'}>
          <img src={home} alt='home' className='w-7 sm:hidden md:hidden' />
          <img
            src={logo}
            alt='logo'
            className='hidden h-full sm:block md:block'
          />
        </Link>
      </div>
      <div className='flex flex-row justify-center gap-6 sm:gap-14'>
        <div className='mt-6 hidden h-0 w-0 duration-75 sm:mt-2 sm:flex sm:h-full sm:w-full sm:flex-col'>
          <img src={publish} alt='publish' className='h-7 w-full' />
          <p className='text-center'>{'Publish'}</p>
        </div>
        <div className='mt-6 duration-75 sm:mt-2 sm:flex sm:h-full sm:w-full sm:flex-col'>
          <img src={message} alt='message' className='h-7 w-full' />
          <p className='invisible text-center sm:visible md:visible'>
            {'Message'}
          </p>
        </div>
        <div className='mt-6 duration-75 sm:mt-2 sm:flex sm:h-full sm:w-full sm:flex-col'>
          <img src={trip} alt='trip' className='h-7 w-full' />
          <p className='invisible text-center sm:visible'>{'Trip'}</p>
        </div>
        <div className='mt-6 duration-75 sm:hidden'>
          <img src={profil} alt='profil' className='h-7 w-full' />
        </div>

        <div
          onClick={toggleDropdown}
          className='hidden cursor-pointer duration-75 sm:mr-5 sm:mt-2 sm:flex sm:h-full sm:w-full sm:flex-row'
        >
          <div className='flex flex-col'>
            <img src={profil} alt='profil' className='h-7 w-full' />
            <p className='invisible text-center sm:visible md:visible'>
              {'Profil'}
            </p>
          </div>
          <img src={arrowDown} alt='arrow-down' className='ml-1 mr-12 mt-4' />
          {isOpen ? (
            <div className='aria-hidden absolute right-2 top-14 mt-2 w-60 rounded-md border bg-[#008689]'>
              <ul className='mb-2 ml-3 mr-6 mt-3'>
                <li className='flex w-full flex-row justify-between'>
                  <p>{'My information'}</p>
                  <img src={rightArrow} alt='right-arrow' />
                </li>
                <li className='flex w-full flex-row justify-between'>
                  <p>{'My opinion'}</p>
                  <img src={rightArrow} alt='right-arrow' />
                </li>
                <li className='flex w-full flex-row justify-between'>
                  <p>{'My preference'}</p>
                  <img src={rightArrow} alt='right-arrow' />
                </li>
                <li className='flex w-full flex-row justify-between'>
                  <p>{'My car'}</p>
                  <img src={rightArrow} alt='right-arrow' />
                </li>
              </ul>
            </div>
          ) : undefined}
        </div>
      </div>
    </div>
  );
}
