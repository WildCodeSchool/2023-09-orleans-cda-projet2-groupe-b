import { useState } from 'react';
import { Link } from 'react-router-dom';

import type {
  LanguagesButtonStates,
  MusicsButtonStates,
} from '@/types/my-preferences';

const renderLanguagesButtons = (
  buttonStates: Record<string, boolean>,
  handleClickFunction: (buttonId: keyof LanguagesButtonStates) => void,
  buttonText: (keyof LanguagesButtonStates)[],
) => {
  return buttonText.map((buttonId, index) => (
    <button
      key={index}
      onClick={() => {
        handleClickFunction(buttonId);
      }}
      className={`h-8 w-20 rounded-full ${
        buttonStates[buttonId]
          ? 'text-primary bg-white'
          : 'bg-gray-400 text-black'
      }`}
    >
      {buttonId}
    </button>
  ));
};

const renderMusicsButtons = (
  buttonStates: Record<string, boolean>,
  handleClickFunction: (buttonId: keyof MusicsButtonStates) => void,
  buttonText: (keyof MusicsButtonStates)[],
) => {
  return buttonText.map((buttonId, index) => (
    <button
      key={index}
      onClick={() => {
        handleClickFunction(buttonId);
      }}
      className={`h-8 w-20 rounded-full ${
        buttonStates[buttonId]
          ? 'text-primary bg-white'
          : 'bg-gray-400 text-black'
      }`}
    >
      {buttonId}
    </button>
  ));
};

export default function MyPreferences() {
  const [musicsButtonStates, setMusicsButtonStates] =
    useState<MusicsButtonStates>({
      rock: false,
      jazz: false,
      rap: false,
      rnb: false,
      pop: false,
    });

  const [languagesButtonStates, setLanguagesButtonStates] =
    useState<LanguagesButtonStates>({
      english: false,
      spanish: false,
      deutsch: false,
      french: false,
    });

  const handleMusicClick = (buttonId: keyof MusicsButtonStates) => {
    setMusicsButtonStates((prevStates) => ({
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
      <div className='mx-auto w-[85%] from-[#FFFFFF]/10 to-[#FFFFFF]/0 md:mt-28 md:h-[50rem] md:w-[60%] md:rounded-[1.5rem] md:bg-gradient-to-br md:p-5 md:shadow-2xl lg:ms-auto lg:w-[35rem] lg:py-5'>
        <h1 className='text-bold ms-[5%] text-2xl sm:mt-20 md:mt-10'>
          {'My profil preferences'}
        </h1>
        <div className=' ms-[5%] mt-10'>
          <textarea
            placeholder='Presentation'
            className=' h-28 w-[95%] rounded-lg p-2 text-black'
          />
        </div>
        <p className='ms-[5%] mt-5'>{'Music'}</p>
        <div className='mt-2 flex justify-around'>
          {renderMusicsButtons(
            musicsButtonStates,
            handleMusicClick,
            Object.keys(musicsButtonStates) as (keyof MusicsButtonStates)[],
          )}
        </div>
        <p className='ms-[5%] mt-5'>{'Languages'}</p>
        <div className='mt-2 flex justify-around'>
          {renderLanguagesButtons(
            languagesButtonStates,
            handleLanguageClick,
            Object.keys(
              languagesButtonStates,
            ) as (keyof LanguagesButtonStates)[],
          )}
        </div>
        <div className='mt-5 flex justify-between'>
          <p className='ms-[5%] text-xl'>{'accept smoking'}</p>
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
      </div>
    </>
  );
}
