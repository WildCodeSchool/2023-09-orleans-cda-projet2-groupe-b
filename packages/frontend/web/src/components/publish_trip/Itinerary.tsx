import { Map } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import type { ItineraryPublishTripType } from '@app/shared';

import Directions from './Directions';

type ElementForStepItinerary = {
  routeIndex: number;
  optionItinerary: number;
};
export default function Itinerary() {
  const { register, setValue } = useFormContext<
    ItineraryPublishTripType & ElementForStepItinerary
  >();

  const [hasTolls, setHasTolls] = useState(false);

  return (
    <div className='flex h-full w-full flex-col lg:flex-row-reverse lg:justify-between '>
      <div className='w-full'>
        <h1 className='text-bold me-[5%] text-center text-2xl md:mt-5'>
          {'maps'}
        </h1>
        <div className='mt-5 h-full lg:ms-[10%]'>
          <Map
            className='mx-auto h-[20rem] w-full rounded lg:me-[10%] lg:h-[30rem] lg:w-[80%]'
            zoom={5}
            gestureHandling={'greedy'}
            disableDefaultUI
          />
          <label className='my-5 flex justify-between lg:justify-around'>
            {'Without tolls'}
            <div className='relative h-5 w-14  cursor-pointer rounded-full bg-gray-200 shadow-inner'>
              <input
                type='checkbox'
                {...register('hasTolls')}
                checked={hasTolls}
                onChange={(error) => {
                  setValue('hasTolls', error.target.checked ? true : false);
                  setHasTolls(!hasTolls);
                  setValue('optionItinerary', 0);
                  setValue('routeIndex', 0);
                }}
                className='peer sr-only'
              />
              <span className='bg-dark peer-checked:bg-primary absolute left-0 top-[-4px] h-7 w-7 rounded-full transition-all duration-500 peer-checked:left-7' />
            </div>
          </label>
        </div>
      </div>
      <Directions />
    </div>
  );
}
