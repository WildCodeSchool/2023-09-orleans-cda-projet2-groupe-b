import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

interface UserData {
  userId: number;
  firstname: string;
  lastname: string;
  created_at: Date;
  birthdate: Date;
  email: string;
  avatar: string;
}

export default function MyInfo() {
  const { userId } = useParams<{ userId: string }>();
  const [userData, setUserData] = useState<UserData | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/my-informations/${userId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erreur HTTP ! Statut : ${res.status}`);
        }
        return res.json();
      })
      .then((data: UserData) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          'Erreur lors de la récupération des données utilisateur :',
          error.message,
        );
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <p>{'Loading...'}</p>;
  }

  if (!userData) {
    return <p>{'User data not found'}</p>;
  }

  const memberSinceDate = new Date(userData.birthdate ?? new Date());
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as Intl.DateTimeFormatOptions;
  const formattedDate = memberSinceDate.toLocaleDateString('en-US', options);

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
        <div className='flex justify-between'>
          <img
            src='../images/user-placeholder.jpg'
            alt='User Avatar'
            className='ms-[10%] mt-5 h-24 rounded-full'
          />

        </div>
        <div className='mt-3'>
          <p className='ms-[10%]'>{`${userData.firstname}`}</p>
        </div>
        <div className='border-light mx-auto w-[80%] border-b' />
        <div className='mt-3'>
          <p className='ms-[10%]'>{`${userData.lastname}`}</p>
        </div>
        <div className='border-light mx-auto w-[80%] border-b' />
        <div className='mt-3'>
          <p className='ms-[10%]'>{`${formattedDate}`}</p>
        </div>
        <div className='border-light mx-auto w-[80%] border-b' />
        <div className='mt-3'>
          <p className='ms-[10%]'>{`${userData.email}`}</p>
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
