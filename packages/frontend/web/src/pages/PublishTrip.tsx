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

        const response = await fetch(`/api/trip`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(transformedData),
        });
        const responseData = await response.json();
        if (responseData.ok === true) {
          navigate('/');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className='mx-auto h-[60%] w-[85%] from-[#FFFFFF]/10 to-[#FFFFFF]/0 md:mt-24 md:h-[42rem]  md:w-[60%] md:rounded-[1.5rem] md:bg-gradient-to-br md:shadow-2xl lg:ms-auto lg:w-[35rem] lg:h-auto lg:mt-36'>
      <div className=' text-light mt-7 sm:mt-20 md:mt-10 flex justify-center'>
        <FormProvider {...methods}>
          <div className='flex w-[600px] justify-center rounded-xl'>
            <form
              onSubmit={methods.handleSubmit(formSubmit)}
              className='flex flex-col items-center'
            >
              <APIProvider apiKey={KEY} libraries={['places']}>
                <div className='ms-[5%] md:mt-5 md:ms-[5%]'>
                  <button
                    type='button'
                    onClick={() => {
                      setStepForm(stepForm - 1);
                    }}
                  >
                    {stepForm <= 0 ? undefined : (
                      <img src='/icons/arrow-left.svg' className=' ' />
                    )}
                  </button>
                </div>
                {displayStepForm()}
              </APIProvider>
              <div className='bg-light text-dark m-auto my-10 h-10 rounded text-center shadow-lg md:mb-10 w-[80%]'>
                <button type='submit' className='my-1 text-xl font-semibold'>
                  {stepForm >= 2 ? 'Publish' : 'Next'}
                </button>
              </div>
            </form>
          </div>
        </FormProvider>
      </div>
    </div>
  );
}
