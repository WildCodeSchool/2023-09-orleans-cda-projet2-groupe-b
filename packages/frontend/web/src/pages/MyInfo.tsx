import { Link } from 'react-router-dom';

export default function MyInfo() {
  return (
    <>
      <Link to='/profil' className='sm:hidden'>
        <img
          src='/icons/right-arrow.svg'
          alt='left-arrow'
          className='my-5 ms-[5%] h-5 rotate-180'
        />
      </Link>
      <div className='mx-auto w-[85%] from-[#FFFFFF]/10 to-[#FFFFFF]/0 md:mt-28 md:h-[50rem] md:w-[60%] md:rounded-[1.5rem] md:bg-gradient-to-br md:p-5 md:shadow-2xl lg:ms-auto lg:w-[35rem] lg:py-5'>
        <h1 className='text-bold ms-[5%] text-2xl sm:mt-20 md:mt-10'>
          {'My informations'}
        </h1>
        <img
          src='/images/user-placeholder.jpg'
          alt='image-profil'
          className='ms-[10%] mt-5 h-24 rounded-full'
        />
        <div className='mt-3'>
          <p className='ms-[10%]'>{'Firstname'}</p>
        </div>
        <div className='border-light mx-auto w-[80%] border-b' />
        <div className='mt-3'>
          <p className='ms-[10%]'>{'Lastname'}</p>
        </div>
        <div className='border-light mx-auto w-[80%] border-b' />
        <div className='mt-3'>
          <p className='ms-[10%]'>{'birthdate'}</p>
        </div>
        <div className='border-light mx-auto w-[80%] border-b' />
        <div className='mt-3'>
          <p className='ms-[10%]'>{'email'}</p>
        </div>
        <div className='border-light mx-auto w-[80%] border-b' />
        <div className='mt-3'>
          <p className='ms-[10%]'>{'driving licence'}</p>
          <img
            src='/images/driving-licence.jpg'
            alt='driving licence image'
            className='mx-auto my-5 w-[80%] rounded'
          />
        </div>
        <button className='bg-light text-dark mx-5 mt-3 w-[90%] rounded p-2 text-xl'>
          {'Save'}
        </button>
      </div>
    </>
  );
}
