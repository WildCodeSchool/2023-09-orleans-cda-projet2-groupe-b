import { zodResolver } from '@hookform/resolvers/zod';
import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';

import type { UserPreferencesBody } from '@app/types';

import LanguagePreferences from '@/components/LanguagePreferences';
import MusicPreferences from '@/components/MusicPreferences';
import { useAuth } from '@/contexts/AuthContext';
import {
  type UserPreferencesFormKeys,
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
    formState: { errors },
  } = useForm<UserPreferencesType>({
    resolver: zodResolver(userPreferencesSchema),
  });

  const [userData, setUserData] = useState<UserPreferencesBody>();
  const { userId } = useParams<{ userId: string }>();

  const [selectionCompleted, setSelectionCompleted] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [musicsButtonStates, setMusicsButtonStates] =
    useState<MusicsButtonStates>({
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
    setMusicsButtonStates(selectedMusics);
  };

  const [languagesButtonStates, setLanguagesButtonStates] =
    useState<LanguagesButtonStates>({
      english: false,
      spanish: false,
      deutsch: false,
      french: false,
    });

  const availableLanguagesFromState: (keyof LanguagesButtonStates)[] = [
    'english',
    'spanish',
    'deutsch',
    'french',
  ];

  const handleLanguagePreferencesChange = (
    selectedLanguages: LanguagesButtonStates,
  ) => {
    setLanguagesButtonStates(selectedLanguages);
  };

  // const handleCheckboxPreferences = (preferenceName: string) => {
  //   switch (preferenceName) {
  //     case 'accept smoking': {
  //       setAcceptSmoking((prevValue) => !prevValue);
  //       break;
  //     }
  //     case 'accept pets': {
  //       setAcceptPets((prevValue) => !prevValue);
  //       break;
  //     }
  //     case 'accept baby': {
  //       setAcceptBaby((prevValue) => !prevValue);
  //       break;
  //     }
  //     case 'accept unvaccinated': {
  //       setAcceptUnvaccinated((prevValue) => !prevValue);
  //       break;
  //     }
  //     default: {
  //       break;
  //     }
  //   }
  // };

  // const acceptOptions = {
  //   is_smoker_allowed: acceptSmoking,
  //   is_animal_allowed: acceptPets,
  //   is_baby_allowed: acceptBaby,
  //   is_non_vaccinated_allowed: acceptUnvaccinated,
  // };

  // const handlePreferencesSubmit = async () => {
  //   if (selectionCompleted) {
  //     try {
  //       const response = await fetch(
  //         `${import.meta.env.VITE_API_URL}/my-preferences/${userId}`,
  //         {
  //           method: 'PUT',
  //           credentials: 'include',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({
  //             is_smoker_allowed: acceptSmoking,
  //             is_animal_allowed: acceptPets,
  //             is_baby_allowed: acceptBaby,
  //             is_non_vaccinated_allowed: acceptUnvaccinated,
  //             selected_musics: musicsButtonStates,
  //             selected_languages: languagesButtonStates,
  //             biography,
  //           }),
  //         },
  //       );

  //       if (response.ok) {
  //         console.log('Data saved successfully');

  //         setSelectionCompleted(true);
  //       } else {
  //         const errorBody = await response.text(); // ou response.json() si le serveur renvoie du JSON
  //         console.error('Error saving data:', errorBody);
  //         throw new Error(errorBody);
  //       }
  //     } catch (error) {
  //       console.error('Network error or while saving local data:', error);
  //     }
  //   } else {
  //     console.log('The user has not completed his selections');
  //   }
  // };

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
        const userLanguages = JSON.parse(userData.selected_languages);
        const userMusics = JSON.parse(userData.selected_musics);

        // Utilisez setValue pour chaque champ du formulaire
        setValue('biography', userData.biography);
        setValue('is_smoker_allowed', userData.is_smoker_allowed);
        setValue('is_animal_allowed', userData.is_animal_allowed);
        setValue('is_baby_allowed', userData.is_baby_allowed);
        setValue(
          'is_non_vaccinated_allowed',
          userData.is_non_vaccinated_allowed,
        );

        const musicStyleKeys: (keyof UserPreferencesType['musicStyles'])[] = [
          'rock',
          'jazz',
          'rap',
          'rnb',
          'pop',
        ];
        const languageSpokenKeys: (keyof UserPreferencesType['languageSpoken'])[] =
          ['english', 'spanish', 'deutsch', 'french'];

        // Mettez à jour les valeurs pour musicStyles
        for (const key of musicStyleKeys) {
          const value = userMusics[key];
          if (value !== undefined) {
            setValue(`musicStyles.${key}` as UserPreferencesFormKeys, value);
            setMusicsButtonStates((prev) => ({ ...prev, [key]: value }));
          }
        }

        // Mettez à jour les valeurs pour languageSpoken
        for (const key of languageSpokenKeys) {
          const value = userLanguages[key];
          if (value !== undefined) {
            setValue(`languageSpoken.${key}` as UserPreferencesFormKeys, value);
            setLanguagesButtonStates((prev) => ({ ...prev, [key]: value }));
          }
        }

        setIsLoggedIn(true);
      } catch (error) {
        if (!signal.aborted) {
          console.error(
            'Erreur lors de la récupération des données utilisateur',
            error,
          );
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [userId, setValue]); // Ajoutez setValue aux dépendances du useEffect
  // Ajoutez setValue aux dépendances du useEffect

  if (!userData) {
    return <p>{'User data not found'}</p>;
  }

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    handlePreferencesSubmit();
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
        <form onSubmit={handleFormSubmit}>
          <div className=' ms-[5%] mt-10'>
            <textarea
              {...register('biography')}
              placeholder='Presentation'
              className='text-dark h-28 w-[95%] rounded-lg p-2'
              value={biography || userData.biography.toString()}
              onChange={(e) => {
                setBiography(e.target.value);
              }}
            />
            {errors.biography ? <p>{errors.biography.message}</p> : null}
          </div>
          <div className='mt-2 flex justify-around' />
          <div>
            <LanguagePreferences
              selectedLanguages={languagesButtonStates}
              availableLanguages={availableLanguagesFromState}
              onChange={handleLanguagePreferencesChange}
              languageSpoken={languagesButtonStates}
            />
            <div className='mt-2 flex justify-around' />
          </div>
          <MusicPreferences
            selectedMusics={musicsButtonStates}
            availableMusics={availableMusicsFromState}
            onChange={handleMusicPreferencesChange}
            musicStyles={musicsButtonStates}
          />
          <div className='mt-5 flex flex-col justify-between'>
            {Object.entries(acceptOptions).map((acceptOption) => (
              <label key={acceptOption[0]}>
                {acceptOption[1]}
                <input
                  type='checkbox'
                  {...register(acceptOption[0] as keyof UserPreferencesType)}
                />
              </label>
            ))}
          </div>
          <div className='mt-5 flex flex-col justify-between'>
            {Object.entries({
              'accept smoking': acceptSmoking,
              'accept pets': acceptPets,
              'accept baby': acceptBaby,
              'accept unvaccinated': acceptUnvaccinated,
            }).map(([preferenceName, value], index) => (
              <div key={index} className='mt-5 flex justify-between'>
                <p className='ms-[5%] text-xl'>{preferenceName}</p>
                <input
                  type='checkbox'
                  checked={value}
                  onChange={() => {
                    handleCheckboxPreferences(preferenceName);
                  }}
                  className='peer absolute left-1/2 h-5 w-full -translate-x-1/2 appearance-none rounded-md'
                />
                <span className='peer-checked:after:bg-primary me-[5%] ml-4 flex h-5 w-10 flex-shrink-0 items-center rounded-full bg-white duration-300 ease-in-out after:h-5 after:w-5 after:rounded-full after:bg-black after:shadow-md after:duration-300 peer-checked:bg-white peer-checked:after:translate-x-5' />
              </div>
            ))}
          </div>
          {isLoggedIn ? (
            <button
              type='submit'
              className='ms-[5%] mt-5 w-[90%] rounded bg-white p-2 text-xl text-black'
            >
              {'Save'}
            </button>
          ) : undefined}
        </form>
      </div>
    </>
  );
}
