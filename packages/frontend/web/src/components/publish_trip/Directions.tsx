import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface checkpoints {
  name: string;
  address: string;
}
interface waypoints {
  location: string;
}

interface itinerary {
  start_address: string;
  end_address: string;
  distance: string | undefined;
  duration: string | undefined;
  start_point: {
    x: number;
    y: number;
  };
  end_point: {
    x: number;
    y: number;
  };
}
[];

export default function Directions() {
  const { getValues, control, setValue, watch } = useFormContext();
  const [currentItinerary, setCurrentItinerary] = useState<itinerary[]>();

  console.log('current itinerary', currentItinerary);

  const checkpoints: checkpoints[] = getValues('checkpoint');
  const waypoints: waypoints[] = checkpoints.map((checkpoint) => ({
    location: checkpoint.address,
  }));

  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  // const [routeIndex, setRouteIndex] = useState(getValues('routeIndex'));
  const routeIndex = watch('routeIndex');
  console.log('get routeIndex', getValues('routeIndex'));
  const selected = routes[routeIndex];
  const listLegs = selected?.legs;
  const leg = selected?.legs[0];
  let totalDistanceWithWaypoints = 0;
  let totalDurationWithWaypoints = 0;
  console.log('has_tolls', getValues('has_tolls'));
  // useEffect(() => {
  //   setValue('optionItinerary', 1);
  //   setValue('routeIndex', 1);
  //   // setRouteIndex(0);
  //   console.log('coucouuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu');
    
  // }, [getValues('has_tolls')]);

  if (listLegs?.length > 1) {
    const arrayDistance = listLegs.map((leg) =>
      parseInt(leg.distance?.text.split(' ')[0] as string),
    );
    const totalDistance = (arrayDistance as number[]).reduce((a, b) => a + b);
    totalDistanceWithWaypoints = totalDistance;
    const arrayDuration = listLegs.map((leg) => leg.duration?.value);
    const totalDuration = (arrayDuration as number[]).reduce((a, b) => a + b);
    totalDurationWithWaypoints = totalDuration;
  }
  if (listLegs?.length > 1) {
    setValue('kilometer', totalDistanceWithWaypoints);
    setValue('travel_time', totalDurationWithWaypoints);
  } else {
    setValue('kilometer', leg?.distance?.text);
    setValue('travel_time', leg?.duration?.value);
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
        travelMode: google.maps.TravelMode.DRIVING,
        avoidTolls: getValues('has_tolls'),
        provideRouteAlternatives: true,
      })
      .then((response: google.maps.DirectionsResult) => {
        console.log('response', response);

        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });
    console.log('directionService', directionsService);
  }, [directionsService, directionsRenderer, getValues('has_tolls')]);

  useEffect(() => {
    if (!directionsRenderer) return;
    console.log('directionRenderer', directionsRenderer);
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  useEffect(() => {
    const itinerary = routes[routeIndex]?.legs.map((leg) => ({
      start_address: leg.start_address,
      end_address: leg.end_address,
      distance: leg.distance?.text,
      duration: leg.duration?.text,
      start_point: {
        x: leg.start_location.lat(),
        y: leg.start_location.lng(),
      },
      end_point: {
        x: leg.end_location.lat(),
        y: leg.end_location.lng(),
      },
    }));
    console.log('const itinerary', itinerary);
    setCurrentItinerary(itinerary);
    setValue('itinerary', itinerary);
  }, [routeIndex, routes, getValues('has_tolls')]);

  if (!leg) return null;
  return (
    <div className='mt-4 w-full space-y-2 bg-white'>
      {listLegs.length > 1 ? (
        <div>
          <p>{leg.start_address}</p>
          <p>
            {Math.floor(totalDurationWithWaypoints / 3600)}h{' '}
            {Math.floor((totalDurationWithWaypoints % 3600) / 60)}min
          </p>
          <p>{totalDistanceWithWaypoints}</p>
          <p>{listLegs[listLegs?.length - 1].end_address}</p>
        </div>
      ) : (
        <h2>{selected.summary}</h2>
      )}

      {routes.map((route, index) => (
        <label
          onClick={() => setValue('routeIndex', index)}
          key={route.summary}
          className='flex items-center justify-between gap-6 space-x-4 rounded-xl p-3 px-8 text-slate-700 ring-1 ring-transparent hover:bg-slate-100 has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-500 has-[:checked]:ring-indigo-200'
        >
          <div>
            <p>{route?.legs[0].start_address.split(',')[0]}</p>
            <div className='flex space-x-3'>
              <p>{route.summary}</p>
              <p>{route?.legs[0].distance?.text}</p>
              <p>{route?.legs[0].duration?.text}</p>
              <p>{getValues('has_tolls') ? 'without tolls' : 'with tolls'}</p>
            </div>
            <p>{route?.legs[0].end_address.split(',')[0]}</p>
          </div>
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
                  console.log(getValues('optionItinerary'));

                  console.log('AAAAAAHHHHHHHHHHHHHHHHHH', index);
                }}
                className='box-content h-1.5 w-1.5 appearance-none rounded-full border-[5px] border-white bg-white bg-clip-padding outline-none ring-1 ring-gray-950/10 checked:border-indigo-500 checked:ring-indigo-500'
              />
            )}
          />
        </label>
      ))}
    </div>
  );
}
