import { Link, useParams } from 'react-router-dom';

export default function MyOpinions() {
  const { userId } = useParams<{ userId: string }>();
  return (
    <div className='mx-auto w-[85%] from-[#FFFFFF]/10 to-[#FFFFFF]/0 md:mt-28 md:h-[50rem] md:w-[60%] md:rounded-[1.5rem] md:bg-gradient-to-br md:p-5 md:shadow-2xl lg:ms-auto lg:w-[35rem] lg:py-5'>
      <Link to={`/profile/${userId}`}>
        <img
          src='/icons/right-arrow.svg'
          alt='left-arrow'
          className='my-5 ms-[5%] h-5 rotate-180'
        />
      </Link>
      <h1 className='text-bold ms-[5%] text-2xl sm:mt-20 md:mt-10'>
        {'My opinions'}
      </h1>
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
      <div className='bg-light mx-auto w-[90%] rounded-lg p-2'>
        <div className='flex '>
          <img
            src='/images/user-placeholder.jpg'
            alt='image-profil'
            className='m-2 h-10 rounded-full'
          />
          <p className='text-dark m-3'>{'Good travel!'}</p>
        </div>
        <div className='text-dark flex justify-between'>
          <div className='flex flex-row'>
            <p className='m-3 text-xs'>{'By jack'}</p>
            <img src='/icons/green-star.svg' className='w-5' />
            <p className='m-3 text-xs'>{'4/5'}</p>
          </div>
          <div className='text-dark'>
            <p className='m-3 text-xs'>{'14/03/2023'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
