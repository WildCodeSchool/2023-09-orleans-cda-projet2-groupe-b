import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import type {
  ItineraryPublishTripType,
  SearchPublishTripType,
} from '@app/shared';

interface Checkpoints {
  name: string;
  address: string;
}
interface Waypoints {
  location: string;
}
interface Itinerary {
  startAddress: string;
  endAddress: string;
  kilometer: number | undefined;
  travelTime: number | undefined;
  startPoint: {
    x: number;
    y: number;
  };
  endPoint: {
    x: number;
    y: number;
  };
}
[];

type ElementForStepItinerary = {
  routeIndex: number;
  optionItinerary: number;
};

export default function Directions() {
  const { getValues, control, setValue, watch } = useFormContext<
    ItineraryPublishTripType & SearchPublishTripType & ElementForStepItinerary
  >();
  const [currentItinerary, setCurrentItinerary] = useState<Itinerary[]>();
  const checkpoints: Checkpoints[] = getValues('checkpoint');
  const waypoints: Waypoints[] = checkpoints.map((checkpoint) => ({
    location: checkpoint.address,
  }));

  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const routeIndex = watch('routeIndex');
  const selected = routes[routeIndex];
  const listLegs = selected ? selected.legs : undefined;
  const leg = selected ? selected.legs[0] : undefined;
  let totalDistanceWithWaypoints = 0;
  let totalDurationWithWaypoints = 0;
  const hasTolls = getValues('hasTolls');

  if (listLegs !== undefined && listLegs.length > 1) {
    const arrayDistance = listLegs.map((leg) => leg.distance?.value);
    const totalDistance = (arrayDistance as number[]).reduce((a, b) => a + b);
    totalDistanceWithWaypoints = totalDistance;
    const arrayDuration = listLegs.map((leg) => leg.duration?.value);
    const totalDuration = (arrayDuration as number[]).reduce((a, b) => a + b);
    totalDurationWithWaypoints = totalDuration;
  }

  if (listLegs !== undefined && listLegs.length > 1) {
    setValue(
      'kilometer',
      Number.parseFloat((totalDistanceWithWaypoints / 1000).toFixed(1)),
    );
    setValue('travelTime', Math.round(totalDurationWithWaypoints / 60));
  } else {
    if (leg !== undefined) {
      setValue(
        'kilometer',
        Number.parseFloat(((leg.distance?.value ?? 0) / 1000).toFixed(1)),
      );
      setValue('travelTime', Math.round((leg.duration?.value ?? 0) / 60));
    }
  }

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: getValues('from'),
        destination: getValues('to'),
        waypoints: waypoints,
        travelMode: 'DRIVING' as google.maps.TravelMode.DRIVING,
        avoidTolls: hasTolls,
        provideRouteAlternatives: true,
      })
      .then((response: google.maps.DirectionsResult) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, [directionsService, directionsRenderer, hasTolls]);

  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer, routes]);

  useEffect(() => {
    const itinerary = routes[routeIndex]?.legs.map((leg) => ({
      startAddress: leg.start_address,
      endAddress: leg.end_address,
      kilometer: Number.parseFloat(
        ((leg.distance?.value ?? 0) / 1000).toFixed(1),
      ),
      travelTime: Math.round((leg.duration?.value ?? 0) / 60),
      startPoint: {
        x: leg.start_location.lat(),
        y: leg.start_location.lng(),
      },
      endPoint: {
        x: leg.end_location.lat(),
        y: leg.end_location.lng(),
      },
    }));
    setCurrentItinerary(itinerary);
    setValue('itinerary', itinerary);
  }, [routeIndex, routes, hasTolls]);

  return (
    <div className='flex h-full w-full flex-col lg:ms-[10%] lg:mt-36 lg:w-[70%] lg:flex-col lg:justify-start'>
      {routes.map((route, index) => (
        <label
          onClick={() => {
            setValue('routeIndex', index);
          }}
          key={route.summary}
          className='bg-light ring-primary has-[:checked]:bg-primary has-[:checked]:text-light has-[:checked]:ring-dark my-2 flex h-28 justify-between rounded-xl text-slate-700 ring-1 hover:bg-slate-400'
        >
          {listLegs !== undefined && listLegs.length > 1 ? (
            <div>
              <p>{leg === undefined ? undefined : leg.start_address}</p>
              <div className='flex'>
                <p>{route.summary}</p>
                <p>
                  {Math.round(totalDistanceWithWaypoints / 1000)}
                  {' km'}
                </p>
                <p>
                  {Math.floor(totalDurationWithWaypoints / 3600)}
                  {' heures'}{' '}
                  {Math.floor((totalDurationWithWaypoints % 3600) / 60)}
                  {'minutes'}
                </p>
                <p>{hasTolls ? 'without tolls' : 'with tolls'}</p>
              </div>
              <p>{listLegs.at(-1)?.end_address}</p>
            </div>
          ) : (
            <div className='flex w-full flex-col'>
              <div className='mx-5 mt-4 flex w-full flex-row justify-between text-sm'>
                <div className='my-auto'>
                  <p>
                    {route.legs[0].duration?.text
                      .replace('heure', 'h')
                      .replace('heures', 'h')
                      .replace('minutes', '')
                      .replace('min', '')}
                  </p>
                </div>
                <div className='flex flex-col items-stretch'>
                  {route.legs[0].start_address.split(',')[0]}
                  <img
                    src='/icons/symbole-itinerary.svg'
                    alt='symbole-itinerary'
                    className='h-10'
                  />
                  {route.legs[0].end_address.split(',')[0]}
                </div>
                <div className='my-auto'>
                  <p>{route.legs[0].distance?.text}</p>
                </div>

                <div className='mx-5 my-auto w-10'>
                  <p>{route.summary}</p>
                </div>

                <p className='mx-5 my-auto'>
                  {hasTolls ? 'without tolls' : 'with tolls'}
                </p>
              </div>
              <p className=' ms-[25%]' />
            </div>
          )}

          <Controller
            name='optionItinerary'
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <input
                type='radio'
                value={index}
                checked={field.value === index}
                onChange={() => {
                  field.onChange(index, currentItinerary);
                }}
                className='ring-dark checked:border-dark checked:ring-dark me-2 mt-2 box-content h-1.5 w-1.5 appearance-none rounded-full border-[5px] ring-1'
              />
            )}
          />
        </label>
      ))}
    </div>
  );
}
