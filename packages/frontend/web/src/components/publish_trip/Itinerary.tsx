import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Directions from './Directions';

export default function Itinerary() {
  const { register, setValue } = useFormContext();

  const [tolls, setTolls] = useState(false);
  setValue('tolls', tolls);
  return (
    <>
      <h1>{"maps"}</h1>
      <div className='h-[500px] w-[800px]'>
        <APIProvider apiKey='AIzaSyCqmue-jTjbdPOQiH_CRwF_PXEaDjsnBMU'>
          <Map
            className='h-full w-full'
            zoom={5}
            gestureHandling={'greedy'}
            disableDefaultUI
          />
          <label className='flex justify-between'>
            {"Without tolls"}{' '}
            <div className='relative h-5 w-14 cursor-pointer rounded-full bg-gray-200 shadow-inner'>
              <input
                type='checkbox'
                {...register('has_tolls')}
                checked={tolls}
                onChange={(e) => {
                  setValue('has_tolls', e.target.checked ? true : false);
                  setTolls(!tolls);
                }}
                className='peer sr-only'
              />
              <span className='absolute left-0 top-[-4px] h-7 w-7 rounded-full bg-gray-300 transition-all duration-500 peer-checked:left-7 peer-checked:bg-gray-800' />
            </div>
          </label>
          <Directions />
        </APIProvider>
      </div>
    </>
  );
}
