import { Link } from 'react-router-dom';

export default function Profile() {
  return (
    <div className='mx-auto w-[85%] from-[#FFFFFF]/10 to-[#FFFFFF]/0 md:mt-28 md:h-[50rem] md:w-[40%] md:rounded-[1.5rem] md:bg-gradient-to-br md:p-5 md:shadow-2xl lg:ms-auto lg:w-[35rem] lg:py-5'>
      <img
        src='/images/user-placeholder.jpg'
        alt='image-profile'
        className='mx-auto mt-7 h-40 rounded-full sm:mt-20'
      />
      <div className='my-7 flex flex-col text-center'>
        <p className='mt-2'>{'firstname Lastname'}</p>
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
      <div className='border-light mx-auto w-[90%] border-b' />
      <Link to='/my-opinions'>
        <div className=' mt-5 flex justify-between'>
          <p className='ms-[5%]'>{'My opinions'}</p>
          <img src='/icons/right-arrow.svg' className='me-[5%]' />
        </div>
      </Link>
      <div className='border-light mx-auto w-[90%] border-b' />
      <Link to='/my-preferences'>
        <div className=' mt-5 flex justify-between'>
          <p className='ms-[5%]'>{'My profile preferences'}</p>
          <img src='/icons/right-arrow.svg' className='me-[5%]' />
        </div>
      </Link>
      <div className='border-light mx-auto w-[90%] border-b' />
      <Link to='/my-car'>
        <div className=' mt-5 flex justify-between'>
          <p className='ms-[5%]'>{'My cars'}</p>
          <img src='/icons/right-arrow.svg' className='me-[5%]' />
        </div>
      </Link>
    </div>
  );
}
