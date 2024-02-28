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
    <div className='flex flex-col w-full h-full md:mt- lg:mt-28 lg:flex-row-reverse lg:justify-around'>
      <h1 className='text-bold text-center me-[5%]  text-2xl md:mt-5'>
        {'maps'}
      </h1>
      <div className='my-5 h-full '>
        <Map
          className='mx-auto h-[80%] w-full rounded'
          zoom={5}
          gestureHandling={'greedy'}
          disableDefaultUI
        />
        <label className='my-5 flex justify-between'>
          {'Without tolls'}
          <div className='relative h-5 w-14 cursor-pointer rounded-full bg-gray-200 shadow-inner'>
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
        <Directions />
      </div>
    </div>
  );
}
