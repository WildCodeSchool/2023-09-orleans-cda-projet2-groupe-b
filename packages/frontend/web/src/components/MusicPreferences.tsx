import { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

import { UserPreferencesType } from '@/schemas/user-preferences-schema';
import type { MusicsButtonStates } from '@/types/my-preferences';

interface MusicPreferencesProps {
  readonly selectedMusics: MusicsButtonStates;
  readonly availableMusics: (keyof MusicsButtonStates)[];
  readonly onChange: (selectedLanguages: MusicsButtonStates) => void;
  readonly register: UseFormRegister<UserPreferencesType>;
}

export default function MusicPreferences({
  selectedMusics,
  availableMusics,
  onChange,
  register,
}: MusicPreferencesProps) {
  const [musicsSelections, setMusicsSelections] = useState<MusicsButtonStates>(
    availableMusics.reduce((acc: MusicsButtonStates, key) => {
      acc[key as keyof MusicsButtonStates] =
        !!selectedMusics[key as keyof MusicsButtonStates];
      return acc;
    }, {} as MusicsButtonStates),
  );


  
  const handleMusicChange = (music: keyof MusicsButtonStates) => {
    const newMusicSelections: MusicsButtonStates = {
      ...musicsSelections,
      [music]: !musicsSelections[music],
    };
    setMusicsSelections(newMusicSelections);
    onChange(newMusicSelections);
    console.log('New music selections:', newMusicSelections);
  };

  return (
    <div>
      <h1 className='my-5 ms-[5%] text-xl'>{'Select your musics'}</h1>
      <div className='my-5 flex flex-row justify-between'>
        {availableMusics.map((music: keyof MusicsButtonStates) => (
          <label
            key={music}
            className={`${
              musicsSelections[music] ? 'bg-primary' : 'bg-light'
            } w-18 cursor-pointer items-center rounded-lg p-2 transition-colors duration-300 sm:w-24 sm:rounded-full`}
          >
            {' '}
            <span className='text-dark text-sm sm:mx-1 sm:text-xl'>
              {music.charAt(0).toUpperCase() + music.slice(1)}
            </span>
            <input
              hidden
              type='checkbox'
              {...register('selected_musics')}
              checked={musicsSelections[music]}
              value={music}
              onChange={() => {
                console.log(`Checkbox for ${music} changed`);
                handleMusicChange(music);
              }}
            />
          </label>
        ))}
      </div>
    </div>
  );
}
