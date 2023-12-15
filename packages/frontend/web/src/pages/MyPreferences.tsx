import { Link } from 'react-router-dom';

export default function MyPreferences() {
  return (
    <>
      <Link to='/profil'>
        <img
          src='/icons/right-arrow.svg'
          alt='left-arrow'
          className='my-5 ms-[5%] h-5 rotate-180'
        />
      </Link>
      <h1 className='text-bold ms-[5%] text-2xl'>{'My profil preferences'}</h1>
      <div className=' mt-5'>
        <textarea
          placeholder='Presentation'
          className=' h-28 w-[90%] rounded-lg p-2'
        />
      </div>
    </>
  );
}
