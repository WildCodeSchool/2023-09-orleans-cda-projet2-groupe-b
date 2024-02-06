import { useState } from 'react';

import { LanguagesButtonStates } from '@/types/my-preferences';

interface LanguagePreferencesProps {
  selectedLanguages: Record<string, boolean>;
  availableLanguages: string[];
  onChange: (selectedLanguages: Record<string, boolean>) => void;
  languageSpoken: LanguagesButtonStates;
}

export default function LanguagePreferences({
    selectedLanguages,
    availableLanguages,
    onChange,
  }: LanguagePreferencesProps) {
    const [languagesSelections, setLanguagesSelections] = useState<Record<string, boolean>>(
      availableLanguages.reduce((acc: Record<string, boolean>, key) => {
        acc[key] = !!selectedLanguages[key]; 
        return acc;
      }, {}),
    );
  
    const handleLanguageChange = (key: string) => {
      const newLanguageSelections = {
        ...languagesSelections,
        [key]: !languagesSelections[key],
      };
      setLanguagesSelections(newLanguageSelections);
      onChange(newLanguageSelections);
    };
  
    return (
      <div>
        <h1>Select your spoken languages</h1>
        {availableLanguages.map((key) => (
          <label key={key}>
            <input
              type='checkbox'
              checked={languagesSelections[key]}
              onChange={() => handleLanguageChange(key)}
            />
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
        ))}
      </div>
    );
  }
