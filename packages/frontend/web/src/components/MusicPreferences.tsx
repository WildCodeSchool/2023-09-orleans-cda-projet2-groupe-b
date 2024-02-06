import { useState } from 'react';

import { MusicsButtonStates } from '@/types/my-preferences';

interface MusicPreferencesProps {
  selectedMusics: Record<string, boolean>;
  availableMusics: string[];
  onChange: (selectedMusics: Record<string, boolean>) => void;
  musicStyles: MusicsButtonStates;
}

export default function MusicPreferences({
  selectedMusics,
  availableMusics,
  onChange,
}: MusicPreferencesProps) {
  const [musicsSelections, setMusicsSelections] = useState<Record<string, boolean>>(
    availableMusics.reduce((acc: Record<string, boolean>, key) => {
      acc[key] = !!selectedMusics[key]; 
      return acc;
    }, {}),
  );

  const handleMusicChange = (key: string) => {
    const newMusicSelections = {
      ...musicsSelections,
      [key]: !musicsSelections[key],
    };
    setMusicsSelections(newMusicSelections);
    onChange(newMusicSelections);
  };

  return (
    <div>
      <h1>Select your music preferences</h1>
      {availableMusics.map(([key]) => (
        <label key={key}>
          <input
            type='checkbox'
            checked={musicsSelections[key]}
            onChange={() => handleMusicChange(key)}
          />
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </label>
      ))}
    </div>
  );
}
