import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';

import type { UserPreferencesBody } from '@app/types';

import LanguagePreferences from '@/components/LanguagePreferences';
import MusicPreferences from '@/components/MusicPreferences';
import {
  type UserPreferencesType,
  userPreferencesSchema,
} from '@/schemas/user-preferences-schema';
import type {
  LanguagesButtonStates,
  MusicsButtonStates,
} from '@/types/my-preferences';

export default function PreferencesForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserPreferencesType>({
    resolver: zodResolver(userPreferencesSchema),
  });

  const [userData, setUserData] = useState<UserPreferencesBody>();

  const { userId } = useParams<{ userId: string }>();

  const [selectedLanguages, setSelectedLanguages] =
    useState<LanguagesButtonStates>({
      english: false,
      spanish: false,
      deutsch: false,
      french: false,
    });
  const [selectedMusics, setSelectedMusics] = useState<MusicsButtonStates>({
    rock: false,
    jazz: false,
    rap: false,
    rnb: false,
    pop: false,
  });

  const availableMusicsFromState: (keyof MusicsButtonStates)[] = [
    'rock',
    'jazz',
    'rap',
    'rnb',
    'pop',
  ];

  const handleMusicPreferencesChange = (selectedMusics: MusicsButtonStates) => {
    console.log('handleMusicPreferencesChange:', selectedMusics);
    setSelectedMusics(selectedMusics);
    setValue('selected_musics', JSON.stringify(selectedMusics));
  };

  const availableLanguagesFromState: (keyof LanguagesButtonStates)[] = [
    'english',
    'spanish',
    'deutsch',
    'french',
  ];

  const handleLanguagePreferencesChange = (
    selectedLanguages: LanguagesButtonStates,
  ) => {
    console.log('handleLanguagePreferencesChange:', selectedLanguages);
    setSelectedLanguages(selectedLanguages);
    setValue('selected_languages', JSON.stringify(selectedLanguages));
  };

  const acceptOptions = {
    is_smoker_allowed: 'Accept smoking',
    is_animal_allowed: 'Accept pets',
    is_baby_allowed: 'Accept baby',
    is_non_vaccinated_allowed: 'Accept unvaccinated',
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/my-preferences/${userId}`,
          { signal },
        );

        if (!response.ok) {
          throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
        }

        const userData = await response.json();
        console.log('Fetched user data:', userData);

        setValue('biography', userData.biography);
        setValue('is_smoker_allowed', Boolean(userData.is_smoker_allowed));
        setValue('is_animal_allowed', Boolean(userData.is_animal_allowed));
        setValue('is_baby_allowed', Boolean(userData.is_baby_allowed));
        setValue(
          'is_non_vaccinated_allowed',
          Boolean(userData.is_non_vaccinated_allowed),
        );
        setValue('selected_languages', userData.selected_languages);
        setValue('selected_musics', userData.selected_musics);
        setUserData(userData);
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des données utilisateur',
          error,
        );
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [userId, setValue]);

  if (!userData) {
    return <p>{'User data not found'}</p>;
  }

  const onsubmit: SubmitHandler<UserPreferencesType> = async (userData) => {
    console.log('onSubmit data:', userData);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/my-preferences/${userId}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            biography: userData.biography,
            is_baby_allowed: userData.is_baby_allowed,
            is_non_vaccinated_allowed: userData.is_non_vaccinated_allowed,
            is_animal_allowed: userData.is_animal_allowed,
            is_smoker_allowed: userData.is_smoker_allowed,
            selected_languages: JSON.parse(userData.selected_languages),
            selected_musics: JSON.parse(userData.selected_musics),
          }),
        },
      );

      if (response.ok) {
        console.log('Data saved successfully');
      } else {
        console.error('Error saving data');
      }
    } catch (error) {
      console.error('Network error or while saving local data:', error);
    }
  };
console.log(userData);

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
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className=' ms-[5%] mt-10'>
            <textarea
              {...register('biography')}
              placeholder='Presentation'
              className='text-dark h-28 w-[95%] rounded-lg p-2'
            />
            {errors.biography ? <p>{errors.biography.message}</p> : null}
          </div>
          <div className='mt-2 flex justify-around' />
          <div>
            <LanguagePreferences
              selectedLanguages={JSON.parse(watch('selected_languages'))}
              availableLanguages={availableLanguagesFromState}
              onChange={handleLanguagePreferencesChange}
              register={register}
            />
            {errors.selected_languages ? (
              <p>{errors.selected_languages.message}</p>
            ) : null}
          </div>
          <div className='mt-2 flex justify-around' />
          <div>
            <MusicPreferences
              selectedMusics={JSON.parse(watch('selected_musics'))}
              availableMusics={availableMusicsFromState}
              onChange={handleMusicPreferencesChange}
              register={register}
            />
            {errors.selected_musics ? (
              <p>{errors.selected_musics.message}</p>
            ) : null}
          </div>
          <div className='my-5 flex flex-col justify-between space-y-4 text-xl'>
            {Object.entries(acceptOptions).map((option) => (
              <label key={option[0]} className='flex justify-between'>
                {option[1]}
                <div className='relative h-5 w-14 cursor-pointer rounded-full bg-gray-200 '>
                  <input
                    type='checkbox'
                    defaultChecked={
                      userData[option[0] as keyof UserPreferencesType] === false
                    }
                    {...register(option[0] as keyof UserPreferencesType)}
                    className='peer sr-only'
                  />
                  <span className='bg-dark peer-checked:bg-primary absolute left-0 top-[-4px] h-7 w-7 rounded-full transition-all duration-500 peer-checked:left-7' />
                </div>
              </label>
            ))}
          </div>
          <button
            type='submit'
            className='bg-light text-dark mx-5 mt-5 w-[90%] rounded p-2 text-xl'
          >
            {'Save'}
          </button>
        </form>
      </div>
    </>
  );
}
