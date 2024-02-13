import { useState } from 'react';

import type { LanguagesButtonStates } from '@/types/my-preferences';

interface LanguagePreferencesProps {
  readonly selectedLanguages: LanguagesButtonStates;
  readonly availableLanguages: (keyof LanguagesButtonStates)[];
  readonly onChange: (selectedLanguages: LanguagesButtonStates) => void;
  readonly languageSpoken: LanguagesButtonStates;
}

export default function LanguagePreferences({
  selectedLanguages,
  availableLanguages,
  onChange,
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
      onChange(newLanguageSelections);
    };

  return (
    <div>
      <h1 className='my-5 ms-[5%]'>{'Select your spoken languages'}</h1>
      <div className='my-5 flex flex-row justify-between'>
        {availableLanguages.map((language) => (
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
              checked={languagesSelections[language]}
              onChange={() => {
                handleLanguageChange(language);
              }}
            />
          </label>
        ))}
      </div>
    </div>
  );
}
