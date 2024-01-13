import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import Info from '@/components/publish_trip/Info';
import Itinerary from '@/components/publish_trip/Itinerary';
import Search from '@/components/publish_trip/Search';

interface FormPublishTrip {
  from: string;
  checkpoint?: {
    address: string;
  }[];
  itinerary: {
    start_address: string;
    end_address: string;
    distance: number;
    duration: number;
    start_point: {
      x: number;
      y: number;
    };
    end_point: {
      x: number;
      y: number;
    };
  }[];
  to: string;
  date: Date;
  price: number;
  car: string;
  seat_available: number;
  reservation_seat: number[]
  should_auto_validate: boolean;
  is_smoker_allowed: boolean;
  is_animal_allowed: boolean;
  is_baby_allowed: boolean;
  is_non_vaccinated_allowed: boolean;
  comment?: string;
  routeIndex: number
}

export default function PublishTrip() {
  const [stepForm, setStepFrom] = useState(0);

  const methods = useForm<FormPublishTrip>({
    defaultValues: { checkpoint: [], routeIndex: 0 },
    
  });

  // const {
  //   formState: { isDirty, isValid },
  // } = methods;

  const displayStepForm = () => {
    switch (stepForm) {
      case 0: {
        return <Search />;
      }
      case 1: {
        return <Itinerary />;
      }
      case 2: {
        return <Info />;
      }
    }
  };

  const formSubmit = async (data: FormPublishTrip) => {
    console.log('Valeur stocké:', data);
    if (stepForm < 2) {
      setStepFrom((current) => current + 1);
    } else {
      try {
        const transformedData = {
          ...data,
          driver_id: 1,
          car_id: 1,
          checkpoints: data.itinerary,
          reservation_seat: data,
        };

        await fetch(`${import.meta.env.VITE_API_URL}/publish-trip`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(transformedData),
        });
      } catch (error) {
        throw new Error(`${String(error)}`);
      }
    }
  };
  return (
    <div className=' text-primary flex justify-center'>
      <FormProvider {...methods}>
        <div className='flex w-[600px] justify-center rounded-xl sm:mt-12 sm:bg-slate-50'>
          <form
            onSubmit={methods.handleSubmit(formSubmit)}
            className='flex flex-col items-center'
          >
            <div className='flex w-full justify-start'>
              <button
                type='button'
                onClick={() => {
                  setStepFrom(stepForm - 1);
                }}
              >
                {stepForm <= 0 ? null : (
                  <img src='/return.svg' className='m-4 mx-6' />
                )}
              </button>
            </div>
            {displayStepForm()}
            <button
              type='submit'
              className='bg-primary m-2 mb-8 w-64 rounded-lg p-2 font-semibold text-white'
              // disabled={!isDirty || !isValid}
            >
              {stepForm >= 2 ? 'Publish' : 'Next'}
            </button>
          </form>
        </div>
      </FormProvider>
    </div>
  );
}
