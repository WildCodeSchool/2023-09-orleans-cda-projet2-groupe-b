import { useState } from 'react';
import { Link } from 'react-router-dom';

import type {
  LanguagesButtonStates,
  MusiqueButtonStates,
} from '@app/types/src/profile';

export default function MyPreferences() {
  const [musiqueButtonStates, setMusiqueButtonStates] = useState({
    rock: false,
    jazz: false,
    rap: false,
    rnb: false,
    pop: false,
  });

  const [languagesButtonStates, setLanguagesButtonStates] = useState({
    english: false,
    spanish: false,
    deutsch: false,
    french: false,
  });

  const handleClick = (buttonId: keyof MusiqueButtonStates) => {
    setMusiqueButtonStates((prevStates) => ({
      ...prevStates,
      [buttonId]: !prevStates[buttonId],
    }));
  };

  const handleLanguageClick = (buttonId: keyof LanguagesButtonStates) => {
    setLanguagesButtonStates((prevStates) => ({
      ...prevStates,
      [buttonId]: !prevStates[buttonId],
    }));
  };

  return (
    <>
      <Link to='/profil' className='sm:hidden'>
        <img
          src='/icons/right-arrow.svg'
          alt='left-arrow'
          className='my-5 ms-[5%] h-5 rotate-180'
        />
      </Link>
      <h1 className='text-bold ms-[5%] text-2xl'>{'My profil preferences'}</h1>
      <div className=' ms-[5%] mt-5'>
        <textarea
          placeholder='Presentation'
          className=' h-28 w-[95%] rounded-lg p-2 text-black'
        />
      </div>
      <p className='ms-[5%] mt-5'>{'Music'}</p>
      <div className='mt-2 flex justify-around'>
        <button
          onClick={() => {
            handleClick('rock');
          }}
          className={`h-8 w-14 rounded-full ${
            musiqueButtonStates['rock']
              ? 'text-primary bg-white'
              : 'bg-gray-400 text-black'
          }`}
        >
          {'Rock'}
        </button>
        <button
          onClick={() => {
            handleClick('jazz');
          }}
          className={`h-8 w-14 rounded-full ${
            musiqueButtonStates['jazz']
              ? 'text-primary bg-white'
              : 'bg-gray-400 text-black'
          }`}
        >
          {'Jazz'}
        </button>
        <button
          onClick={() => {
            handleClick('rap');
          }}
          className={`h-8 w-14 rounded-full ${
            musiqueButtonStates['rap']
              ? 'text-primary bg-white'
              : 'bg-gray-400 text-black'
          }`}
        >
          {'Rap'}
        </button>
        <button
          onClick={() => {
            handleClick('rnb');
          }}
          className={`h-8 w-14 rounded-full ${
            musiqueButtonStates['rnb']
              ? 'text-primary bg-white'
              : 'bg-gray-400 text-black'
          }`}
        >
          {'RnB'}
        </button>
        <button
          onClick={() => {
            handleClick('pop');
          }}
          className={`h-8 w-14 rounded-full ${
            musiqueButtonStates['pop']
              ? 'text-primary bg-white'
              : 'bg-gray-400 text-black'
          }`}
        >
          {'Pop'}
        </button>
      </div>
      <p className='ms-[5%] mt-5'>{'Languages'}</p>
      <div className='mt-2 flex justify-around'>
        <button
          onClick={() => {
            handleLanguageClick('english');
          }}
          className={`h-8 w-20 rounded-full ${
            languagesButtonStates['english']
              ? 'text-primary bg-white'
              : 'bg-gray-400 text-black'
          }`}
        >
          {'English'}
        </button>
        <button
          onClick={() => {
            handleLanguageClick('spanish');
          }}
          className={`h-8 w-20 rounded-full ${
            languagesButtonStates['spanish']
              ? 'text-primary bg-white'
              : 'bg-gray-400 text-black'
          }`}
        >
          {'Spanish'}
        </button>
        <button
          onClick={() => {
            handleLanguageClick('deutsch');
          }}
          className={`h-8 w-20 rounded-full ${
            languagesButtonStates['deutsch']
              ? 'text-primary bg-white'
              : 'bg-gray-400 text-black'
          }`}
        >
          {'Deutsch'}
        </button>
        <button
          onClick={() => {
            handleLanguageClick('french');
          }}
          className={`h-8 w-20 rounded-full ${
            languagesButtonStates['french']
              ? 'text-primary bg-white'
              : 'bg-gray-400 text-black'
          }`}
        >
          {'French'}
        </button>
      </div>
      <div className='mt-5 flex justify-between'>
        <p className='ms-[5%] text-xl'>{'accept smocking'}</p>
        <input
          type='checkbox'
          className='peer absolute left-1/2 h-5 w-full -translate-x-1/2 appearance-none rounded-md'
        />
        <span className='peer-checked:after:bg-primary me-[5%] ml-4 flex h-5 w-10 flex-shrink-0 items-center rounded-full bg-white  duration-300 ease-in-out after:h-5 after:w-5 after:rounded-full after:bg-black after:shadow-md after:duration-300  peer-checked:bg-white peer-checked:after:translate-x-5' />
      </div>
      <div className='mt-5 flex justify-between'>
        <p className='ms-[5%] text-xl'>{'accept pets'}</p>
        <input
          type='checkbox'
          className='peer absolute left-1/2 h-5 w-full -translate-x-1/2 appearance-none rounded-md'
        />
        <span className='peer-checked:after:bg-primary me-[5%] ml-4 flex h-5 w-10 flex-shrink-0 items-center rounded-full bg-white  duration-300 ease-in-out after:h-5 after:w-5 after:rounded-full after:bg-black after:shadow-md after:duration-300  peer-checked:bg-white peer-checked:after:translate-x-5' />
      </div>
      <div className='mt-5 flex justify-between'>
        <p className='ms-[5%] text-xl'>{'accept baby'}</p>
        <input
          type='checkbox'
          className='peer absolute left-1/2 h-5 w-full -translate-x-1/2 appearance-none rounded-md'
        />
        <span className='peer-checked:after:bg-primary me-[5%] ml-4 flex h-5 w-10 flex-shrink-0 items-center rounded-full bg-white  duration-300 ease-in-out after:h-5 after:w-5 after:rounded-full after:bg-black after:shadow-md after:duration-300  peer-checked:bg-white peer-checked:after:translate-x-5' />
      </div>
      <div className='mt-5 flex justify-between'>
        <p className='ms-[5%] text-xl'>{'accept unvaccinated'}</p>
        <input
          type='checkbox'
          className='peer absolute left-1/2 h-5 w-full -translate-x-1/2 appearance-none rounded-md'
        />
        <span className='peer-checked:after:bg-primary me-[5%] ml-4 flex h-5 w-10 flex-shrink-0 items-center rounded-full bg-white  duration-300 ease-in-out after:h-5 after:w-5 after:rounded-full after:bg-black after:shadow-md after:duration-300  peer-checked:bg-white peer-checked:after:translate-x-5' />
      </div>
      <button className='ms-[5%] mt-5 w-[90%] rounded bg-white p-2 text-xl text-black'>
        {'Save'}
      </button>
    </>
  );
}
