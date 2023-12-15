import { Link } from 'react-router-dom';

export default function MyOpinions() {
  return (
    <>
      <Link to='/profil'>
        <img
          src='/icons/right-arrow.svg'
          alt='left-arrow'
          className='my-5 ms-[5%] h-5 rotate-180'
        />
      </Link>
      <h1 className='text-bold ms-[5%] text-2xl'>{'My opinions'}</h1>
      <div className='bg-primary mx-auto my-5 h-44 w-44 rounded-full'>
        <p className='p-5 text-center text-2xl'>{'4/5'}</p>
        <div className='flex justify-center'>
          <img src='/icons/star.svg' />
          <img src='/icons/star.svg' />
          <img src='/icons/star.svg' />
          <img src='/icons/star.svg' />
          <img src='/icons/blank-star.svg' />
        </div>
        <p className='p-5 text-center'>{'Number opinions'}</p>
      </div>
      <div className='mx-auto w-[90%] rounded-lg bg-white p-2'>
        <div className='flex '>
          <img
            src='/images/placeholder.jpg'
            alt='image-profil'
            className='m-2 h-10 rounded-full'
          />
          <p className='m-3 text-black'>{'Good travel!'}</p>
        </div>
        <div className='flex justify-between text-black'>
          <div className='flex flex-row'>
            <p className='m-3 text-xs'>{'By jack'}</p>
            <img src='/icons/green-star.svg' className='w-5' />
            <p className='m-3 text-xs'>{'4/5'}</p>
          </div>
          <div className='text-black'>
            <p className='m-3 text-xs'>{'14/03/2023'}</p>
          </div>
        </div>
      </div>
    </>
  );
}
