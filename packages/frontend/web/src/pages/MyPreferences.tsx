import { FormEvent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import LanguagePreferences from '@/components/LanguagePreferences';
import MusicPreferences from '@/components/MusicPreferences';
import { useAuth } from '@/contexts/AuthContext';
import {
  LanguagesButtonStates,
  MusicsButtonStates,
} from '@/types/my-preferences';

interface UserData {
  biography: string;
  is_baby_allowed: boolean;
  is_non_vaccinated_allowed: boolean;
  is_animal_allowed: boolean;
  is_smoker_allowed: boolean;
  selected_languages: string;
  selected_musics: string;
}

export default function MyPreferences() {
  const [userData, setUserData] = useState<UserData>();
  const [loading, setLoading] = useState(true);
  const { userId } = useParams<{ userId: string }>();
  const [acceptSmoking, setAcceptSmoking] = useState(false);
  const [acceptPets, setAcceptPets] = useState(false);
  const [acceptBaby, setAcceptBaby] = useState(false);
  const [acceptUnvaccinated, setAcceptUnvaccinated] = useState(false);
  const [biography, setBiography] = useState('');
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

  const availableMusicsFromState = ['rock', 'jazz', 'rap', 'rnb', 'pop'];

  const handleMusicPreferencesChange = (
    selectedMusics: Record<string, boolean>,
  ) => {
    setMusicsButtonStates(selectedMusics);
  };

  const [languagesButtonStates, setLanguagesButtonStates] =
    useState<LanguagesButtonStates>({
      english: false,
      spanish: false,
      deutsch: false,
      french: false,
    });

  const availableLanguagesFromState = [
    'english',
    'spanish',
    'deutsch',
    'french',
  ];

  const handleLanguagePreferencesChange = (
    selectedLanguages: Record<string, boolean>,
  ) => {
    setLanguagesButtonStates(selectedLanguages);
  };

  const handleCheckboxPreferences = (preferenceName: string) => {
    switch (preferenceName) {
      case 'accept smoking':
        setAcceptSmoking((prevValue) => !prevValue);
        break;
      case 'accept pets':
        setAcceptPets((prevValue) => !prevValue);
        break;
      case 'accept baby':
        setAcceptBaby((prevValue) => !prevValue);
        break;
      case 'accept unvaccinated':
        setAcceptUnvaccinated((prevValue) => !prevValue);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    if (selectionCompleted) {
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
              is_smoker_allowed: acceptSmoking,
              is_animal_allowed: acceptPets,
              is_baby_allowed: acceptBaby,
              is_non_vaccinated_allowed: acceptUnvaccinated,
              selected_musics: musicsButtonStates,
              selected_languages: languagesButtonStates,
              biography,
            }),
          },
        );

        if (response.ok) {
          console.log('Données enregistrées avec succès.');

          setSelectionCompleted(true);
        } else {
          const errorBody = await response.text(); // ou response.json() si le serveur renvoie du JSON
          console.error(
            "Erreur lors de l'enregistrement des données:",
            errorBody,
          );
          throw new Error(errorBody);
        }
      } catch (error) {
        console.error(
          "Erreur réseau ou lors de l'enregistrement des données locales :",
          error,
        );
      }
    } else {
      console.log("L'utilisateur n'a pas terminé ses sélections.");
    }
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

        if (!signal.aborted) {
          setAcceptSmoking(userData.is_smoker_allowed);
          setAcceptPets(userData.is_animal_allowed);
          setAcceptBaby(userData.is_baby_allowed);
          setAcceptUnvaccinated(userData.is_non_vaccinated_allowed);
          setBiography(userData.biography);
          setLanguagesButtonStates(userData.selected_languages);
          setMusicsButtonStates(userData.selected_musics);
          setUserData(userData);
          setLoading(false);
          setIsLoggedIn(true);
        }
      } catch (error) {
        if (!signal.aborted) {
          console.error(
            'Erreur lors de la récupération des données utilisateur ',
          );
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [userId]);

  if (loading) {
    return <p>{'Loading...'}</p>;
  }

  if (!userData) {
    return <p>{'User data not found'}</p>;
  }

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSelectionCompleted(true);
    handleSubmit();
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
              placeholder='Presentation'
              className='text-dark h-28 w-[95%] rounded-lg p-2'
              value={
                biography !== undefined
                  ? biography
                  : userData?.biography?.toString()
              }
              onChange={(e) => setBiography(e.target.value)}
            />
          </div>
          <div className='mt-2 flex justify-around'></div>
          <div>
            <LanguagePreferences
              selectedLanguages={languagesButtonStates}
              availableLanguages={availableLanguagesFromState}
              onChange={handleLanguagePreferencesChange}
              languageSpoken={languagesButtonStates} 
            />
            <div className='mt-2 flex justify-around'></div>
          </div>
          <MusicPreferences
            selectedMusics={musicsButtonStates}
            availableMusics={availableMusicsFromState}
            onChange={handleMusicPreferencesChange}
            musicStyles={musicsButtonStates} 
          />
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
                  onChange={() => handleCheckboxPreferences(preferenceName)}
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
