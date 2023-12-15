import { Link } from 'react-router-dom';

export default function Profil() {
  return (
    <>
      <img
        src='/images/placeholder.jpg'
        alt='image-profil'
        className='mx-auto mt-7 h-40 rounded-full'
      />
      <div className='my-7 flex flex-col text-center'>
        <p className='mt-2'>{'Firstname Lastname'}</p>
        <p className='mt-2'>{'Age'}</p>
        <p className='mt-2'>{'Years of driving'}</p>
        <p className='mt-2'>{'member since'}</p>
        <div className='mt-2 flex justify-center'>
          <img src='/icons/star.svg' />
          <img src='/icons/star.svg' />
          <img src='/icons/star.svg' />
          <img src='/icons/star.svg' />
          <img src='/icons/blank-star.svg' />
        </div>
        <p className='mt-2'>{'Kilometer traveled'}</p>
        <p className='mt-2'>{'CO2'}</p>
        <p className='mt-2'>{'Price economy'}</p>
      </div>
      <Link to='/my-informations'>
        <div className=' mt-5 flex justify-between'>
          <p className='ms-[5%]'>{'My informations'}</p>
          <img src='/icons/right-arrow.svg' className='me-[5%]' />
        </div>
      </Link>
      <div className='mx-auto w-[90%] border-b border-white' />
      <Link to='/my-opinions'>
        <div className=' mt-5 flex justify-between'>
          <p className='ms-[5%]'>{'My opinions'}</p>
          <img src='/icons/right-arrow.svg' className='me-[5%]' />
        </div>
      </Link>
      <div className='mx-auto w-[90%] border-b border-white' />
      <Link to='/my-preferences'>
        <div className=' mt-5 flex justify-between'>
          <p className='ms-[5%]'>{'My profil preferences'}</p>
          <img src='/icons/right-arrow.svg' className='me-[5%]' />
        </div>
      </Link>
      <div className='mx-auto w-[90%] border-b border-white' />
      <Link to='My cars'>
        <div className=' mt-5 flex justify-between'>
          <p className='ms-[5%]'>{'My cars'}</p>
          <img src='/icons/right-arrow.svg' className='me-[5%]' />
        </div>
      </Link>
    </>
  );
}
