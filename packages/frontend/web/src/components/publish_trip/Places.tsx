import { StandaloneSearchBox, useJsApiLoader } from '@react-google-maps/api';
import { useRef, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

export default function Places() {
  // const inputRef = useRef(null);

  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: "AIzaSyCqmue-jTjbdPOQiH_CRwF_PXEaDjsnBMU",
  //   libraries: ['places']
  // });

  // const handlePlaceChanged = () => {
  //   const [place] = inputRef.current?.getPlaces();
  //   if (place) {
  //     console.log(place.formatted_address);
  //     console.log(place.geometry.location.lat());
  //     console.log(place.geometry.location.lng());
  //   }
  // };

  // return (
  //   isLoaded && (
  //     <StandaloneSearchBox
  //       onLoad={(ref) => (inputRef.current = ref)}
  //       onPlacesChanged={handlePlaceChanged}
  //     >
  //       <input
  //         type='text'
  //         className='p-2 w-32'
  //         placeholder='Enter Location'
  //       />
  //     </StandaloneSearchBox>
  //   )
  // );
  // const [value, setValue] = useState(null);

  //   <>
  //     <GooglePlacesAutocomplete
  //       apiKey='AIzaSyCqmue-jTjbdPOQiH_CRwF_PXEaDjsnBMU'
  //       apiOptions={{ language: 'fr', region: 'fr' }}
  //       selectProps={{
  //       }}
  //     />
  //   </>
}
