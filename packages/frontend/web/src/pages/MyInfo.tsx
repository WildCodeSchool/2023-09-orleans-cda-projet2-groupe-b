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
      <h1 className='text-bold ms-[5%] text-2xl'>{'My informations'}</h1>
      <img
        src='/images/placeholder.jpg'
        alt='image-profil'
        className='ms-[10%] mt-5 h-24 rounded-full'
      />
      <div className='mt-3'>
        <p className='ms-[10%]'>{'Firstname'}</p>
      </div>
      <div className='mx-auto w-[80%] border-b border-white' />
      <div className='mt-3'>
        <p className='ms-[10%]'>{'Lastname'}</p>
      </div>
      <div className='mx-auto w-[80%] border-b border-white' />
      <div className='mt-3'>
        <p className='ms-[10%]'>{'birthdate'}</p>
      </div>
      <div className='mx-auto w-[80%] border-b border-white' />
      <div className='mt-3'>
        <p className='ms-[10%]'>{'email'}</p>
      </div>
      <div className='mx-auto w-[80%] border-b border-white' />
      <div className='mt-3'>
        <p className='ms-[10%]'>{'driving licence'}</p>
        <img
          src='/images/driving-licence.jpg'
          alt='driving licence image'
          className='mx-auto my-5 w-[80%] rounded'
        />
      </div>
      <button className='mx-5 mt-3 w-[90%] rounded bg-white p-2 text-xl text-black'>
        {'Save'}
      </button>
    </>
  );
}
