import { useFormContext } from 'react-hook-form';

import type { LanguagesButtonStates } from '@/types/my-preferences';

const availableLanguages: (keyof LanguagesButtonStates)[] = [
  'english',
  'spanish',
  'deutsch',
  'french',
];

export default function LanguagePreferences() {
  const { setValue, watch } = useFormContext();
  const languageSelections = JSON.parse(watch('selected_languages'));

  const handleLanguagePreferencesChange = (
    language: keyof LanguagesButtonStates,
  ) => {
    const newSelectedLanguages = {
      ...languageSelections,
      [language]: !languageSelections[language],
    };
    setValue('selected_languages', JSON.stringify(newSelectedLanguages));
  };

  return (
    <div>
      <h1 className='my-2 ms-[5%] text-xl'>{'Select your spoken languages'}</h1>
      <div className='my-5 flex flex-row justify-between'>
        {availableLanguages.map((language: keyof LanguagesButtonStates) => (
          <label
            key={language}
            className={`${
              languageSelections[language] ? 'bg-primary' : 'bg-light'
            } w-18 cursor-pointer items-center rounded-lg p-2 transition-colors duration-300 sm:w-24 sm:rounded-full`}
          >
            <span className='text-dark text-sm sm:mx-1 sm:text-xl'>
              {language.charAt(0).toUpperCase() + language.slice(1)}
            </span>
            <input
              hidden
              type='checkbox'
              value={language}
              checked={languageSelections[language]}
              onChange={() => {
                handleLanguagePreferencesChange(language);
              }}
            />
          </label>
        ))}
      </div>
    </div>
  );
}
