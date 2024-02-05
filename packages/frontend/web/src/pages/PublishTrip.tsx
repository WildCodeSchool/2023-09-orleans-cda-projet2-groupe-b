import { APIProvider } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';

import Info from '@/components/publish_trip/Info';
import Itinerary from '@/components/publish_trip/Itinerary';
import Search from '@/components/publish_trip/Search';
import { useAuth } from '@/contexts/AuthContext';

interface FormPublishTrip {
  from: string;
  checkpoint?: {
    address: string;
  }[];
  itinerary: {
    startAddress: string;
    endAddress: string;
    kilometer: number;
    travelTime: number;
    startPoint: {
      x: number;
      y: number;
    };
    endPoint: {
      x: number;
      y: number;
    };
  }[];
  to: string;
  date: Date;
  price: number;
  carId: bigint;
  seatAvailable: number;
  reservationSeat: number[];
  shouldAutoValidate: boolean;
  isSmokerAllowed: boolean;
  isAnimalAllowed: boolean;
  isBabyAllowed: boolean;
  isNonVaccinatedAllowed: boolean;
  comment?: string;
  routeIndex: number;
}

const KEY = import.meta.env.VITE_REACT_GOOGLE_MAPS_API_KEY;

if (KEY === undefined) {
  throw new Error('Key google maps is undefined');
}

export default function PublishTrip() {
  const methods = useForm<FormPublishTrip>({
    defaultValues: { checkpoint: [], routeIndex: 0, from: '', to: '' },
  });

  const [stepForm, setStepForm] = useState(0);

  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

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
    if (stepForm < 2) {
      setStepForm((current) => current + 1);
    } else {
      try {
        const transformedData = {
          ...data,
          checkpoints: data.itinerary,
          seatAvailable: data.reservationSeat.length,
        };

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/publish-trip`,
          {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(transformedData),
          },
        );
        const responseData = await response.json();
        if (responseData.ok === true) {
          navigate('/');
        }
      } catch (error) {
        throw new Error(`${String(error)}`);
      }
    }
  };

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className=' text-primary mt-20 flex justify-center'>
      <FormProvider {...methods}>
        <div className='flex w-[600px] justify-center rounded-xl sm:mt-12 sm:bg-slate-50'>
          <form
            onSubmit={methods.handleSubmit(formSubmit)}
            className='flex flex-col items-center'
          >
            <APIProvider apiKey={KEY} libraries={['places']}>
              <div className='flex w-full justify-start'>
                <button
                  type='button'
                  onClick={() => {
                    setStepForm(stepForm - 1);
                  }}
                >
                  {stepForm <= 0 ? undefined : (
                    <img src='/icons/return.svg' className='m-4 mx-6' />
                  )}
                </button>
              </div>
              {displayStepForm()}
            </APIProvider>
            <button
              type='submit'
              className='bg-primary m-2 mb-8 w-64 rounded-lg p-2 font-semibold text-white'
            >
              {stepForm >= 2 ? 'Publish' : 'Next'}
            </button>
          </form>
        </div>
      </FormProvider>
    </div>
  );
}
