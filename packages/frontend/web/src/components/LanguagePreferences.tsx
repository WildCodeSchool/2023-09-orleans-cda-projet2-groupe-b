import { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

import { UserPreferencesType } from '@/schemas/user-preferences-schema';
import type { LanguagesButtonStates } from '@/types/my-preferences';

interface LanguagePreferencesProps {
  readonly selectedLanguages: LanguagesButtonStates;
  readonly availableLanguages: (keyof LanguagesButtonStates)[];
  readonly onChange: (selectedLanguages: LanguagesButtonStates) => void;
  readonly register: UseFormRegister<UserPreferencesType>;
}

export default function LanguagePreferences({
  selectedLanguages,
  availableLanguages,
  onChange,
  register,
}: LanguagePreferencesProps) {
  const [languagesSelections, setLanguagesSelections] =
    useState<LanguagesButtonStates>(
      availableLanguages.reduce((acc: LanguagesButtonStates, key) => {
        acc[key as keyof LanguagesButtonStates] =
          !!selectedLanguages[key as keyof LanguagesButtonStates];
        return acc;
      }, {} as LanguagesButtonStates),
    );

  const handleLanguageChange = (language: keyof LanguagesButtonStates) => {
    const newLanguageSelections: LanguagesButtonStates = {
      ...languagesSelections,
      [language]: !languagesSelections[language],
    };
    setLanguagesSelections(newLanguageSelections);
    onChange(newLanguageSelections); // Envoyer l'objet directement, pas besoin de JSON.stringify
    console.log('New language selections:', newLanguageSelections);
  };

  return (
    <div>
      <h1 className='my-5 ms-[5%] text-xl'>{'Select your spoken languages'}</h1>
      <div className='my-5 flex flex-row justify-between'>
        {availableLanguages.map((language: keyof LanguagesButtonStates) => (
          <label
            key={language}
            className={`${
              languagesSelections[language] ? 'bg-primary' : 'bg-light'
            } w-18 cursor-pointer items-center rounded-lg p-2 transition-colors duration-300 sm:w-24 sm:rounded-full`}
          >
            {' '}
            <span className='text-dark text-sm sm:mx-1 sm:text-xl'>
              {language.charAt(0).toUpperCase() + language.slice(1)}
            </span>
            <input
              hidden
              type='checkbox'
              {...register('selected_languages')}
              checked={languagesSelections[language]}
              value={language}
              onChange={() => {
                console.log(`Checkbox for ${language} changed`);
                handleLanguageChange(language);
              }}
            />
          </label>
        ))}
      </div>
    </div>
  );
}
