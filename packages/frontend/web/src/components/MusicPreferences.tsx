import { useFormContext } from 'react-hook-form';

import type { MusicsButtonStates } from '@/types/my-preferences';

const availableMusics: (keyof MusicsButtonStates)[] = [
  'rock',
  'jazz',
  'rap',
  'rnb',
  'pop',
];

export default function MusicPreferences() {
  const { setValue, watch } = useFormContext();
  const musicSelections = JSON.parse(watch('selected_musics'));

  const handleMusicPreferencesChange = (music: keyof MusicsButtonStates) => {
    const newSelectedMusics = {
      ...musicSelections,
      [music]: !musicSelections[music],
    };
    setValue('selected_musics', JSON.stringify(newSelectedMusics));
  };

  return (
    <>
      <h1 className='my-2 ms-[5%] text-xl'>{'Select your musics'}</h1>
      <div className='my-5 flex flex-row justify-between'>
        {availableMusics.map((music: keyof MusicsButtonStates) => (
          <label
            key={music}
            className={`${
              musicSelections[music] ? 'bg-primary' : 'bg-light'
            } w-18 cursor-pointer items-center rounded-lg p-2 transition-colors duration-300 sm:w-24 sm:rounded-full`}
          >
            <span className='text-dark text-sm sm:mx-1 sm:text-xl'>
              {music.charAt(0).toUpperCase() + music.slice(1)}
            </span>
            <input
              hidden
              type='checkbox'
              value={music}
              checked={musicSelections[music]}
              onChange={() => {
                handleMusicPreferencesChange(music);
              }}
            />
          </label>
        ))}
      </div>
    </>
  );
}
