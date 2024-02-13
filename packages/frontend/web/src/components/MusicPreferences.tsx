import { useState } from 'react';

import type { MusicsButtonStates } from '@/types/my-preferences';

interface MusicPreferencesProps {
  readonly selectedMusics: MusicsButtonStates;
  readonly availableMusics: (keyof MusicsButtonStates) [];
  readonly onChange: (selectedMusics: MusicsButtonStates) => void;
  readonly musicStyles: MusicsButtonStates;
}

export default function MusicPreferences({
  selectedMusics,
  availableMusics,
  onChange,
}: MusicPreferencesProps) {
  const [musicsSelections, setMusicsSelections] = useState<
   MusicsButtonStates
  >(
    availableMusics.reduce((acc: MusicsButtonStates, music) => {
      acc[music as keyof MusicsButtonStates] = !!selectedMusics[music as keyof MusicsButtonStates];
      return acc;
    }, {} as MusicsButtonStates),
  );

  const handleMusicChange = (music: keyof MusicsButtonStates) => {
    const newMusicSelections = {
      ...musicsSelections,
      [music]: !musicsSelections[music],
    };
    setMusicsSelections(newMusicSelections);
    onChange(newMusicSelections);
  };

  return (
    <div>
      <h1 className='text-bold text-2xl ms-[5%] my-5'>{"Select your music preferences"}</h1>
      <div className='flex flex-row my-5 justify-between'>
        {availableMusics.map((music) => (
            <label
            key={music}
              className={`${
                musicsSelections[music] ? 'bg-primary' : 'bg-light'
              } cursor-pointer items-center rounded-lg w-12 sm:rounded-full p-2 transition-colors duration-300 sm:w-24`}
            >
              <span className='text-dark text-sm sm:mx-5 sm:text-xl'>
                {music.charAt(0).toUpperCase() + music.slice(1)}
              </span>
              <input
                hidden
                type='checkbox'
                checked={musicsSelections[music]}
                onChange={() => { handleMusicChange(music); }}
              />
            </label>
        ))}
      </div>
    </div>
  );
}
