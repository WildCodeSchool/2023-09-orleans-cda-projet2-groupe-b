import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

interface UserData {
  userId: number;
  firstname: string;
  lastname: string;
  created_at: Date;
  birthdate: Date;
  driver_kilometer_traveled: GLfloat;
  passenger_kilometer_traveled: GLfloat;
}

function calculateAge(birthday: Date | undefined) {
  if (!birthday) {
    return;
  }

  const birthdate = new Date(birthday);

  if (Number.isNaN(birthdate.getTime())) {
    return;
  }

  const ageDifMs = Date.now() - birthdate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export default function Profile() {
  const { userId } = useParams<{ userId: string }>();
  const [userData, setUserData] = useState<UserData | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`/api/profile`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erreur HTTP ! Statut : ${res.status}`);
        }
        return res.json();
      })
      .then((data: UserData) => {
        setUserData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(
          'Erreur lors de la récupération des données utilisateur :',
          error.message,
        );
        setIsLoading(false);
      });
  }, [userId]);

  if (isLoading) {
    return <p>{'Loading...'}</p>;
  }
  const memberSinceDate = new Date(userData?.created_at ?? new Date());
  const formattedDate = memberSinceDate.toDateString();

  const age = userData?.birthdate
    ? calculateAge(userData.birthdate)
    : undefined;

  const totalKilometers =
    Number.parseFloat(`${userData?.driver_kilometer_traveled}`) +
    Number.parseFloat(`${userData?.passenger_kilometer_traveled}`);

  if (!userData) {
    return <p>{'User data not found'}</p>;
  }

  const Logout = async () => {
    try {
      const response = await fetch(`/api/auth/logout`, {
        method: 'POST',
      });

      if (response.ok) {
        navigate('/login');
      } else {
        console.error('Logout failure');
      }
    } catch (error) {
      console.error('disconnection error', error);
    }
  };

  return (
    <div className='mx-auto w-[85%] from-[#FFFFFF]/10 to-[#FFFFFF]/0 md:mt-28 md:h-[50rem] md:w-[40%] md:rounded-[1.5rem] md:bg-gradient-to-br md:p-5 md:shadow-2xl lg:ms-auto lg:w-[35rem] lg:py-5'>
      <img
        src='/images/user-placeholder.jpg'
        alt='image-profile'
        className='mx-auto mt-7 h-40 rounded-full sm:mt-20'
      />
      <div className='my-7 flex flex-col text-center'>
        <p className='mt-2'>{`${userData.firstname} ${userData.lastname}`}</p>
        <p className='mt-2'>{`Age: ${age}`}</p>
        <p className='mt-2'>{'Years of driving'}</p>
        <p className='mt-2'>{`Member since: ${formattedDate}`}</p>
        <div className='mt-2 flex justify-center'>
          <img src='/icons/star.svg' />
          <img src='/icons/star.svg' />
          <img src='/icons/star.svg' />
          <img src='/icons/star.svg' />
          <img src='/icons/blank-star.svg' />
        </div>
        <p className='mt-2'>{`Total Kilometers Traveled: ${totalKilometers}`}</p>{' '}
        <p className='mt-2'>{'CO2'}</p>
        <p className='mt-2'>{'Price economy'}</p>{' '}
      </div>
      <Link to={`/my-informations`}>
        <div className=' mt-5 flex justify-between'>
          <p className='ms-[5%]'>{'My informations'}</p>
          <img src='/icons/right-arrow.svg' className='me-[5%]' />
        </div>
      </Link>
      <div className='border-light mx-auto w-[90%] border-b' />
      <Link to={`/my-opinions`}>
        <div className=' mt-5 flex justify-between'>
          <p className='ms-[5%]'>{'My opinions'}</p>
          <img src='/icons/right-arrow.svg' className='me-[5%]' />
        </div>
      </Link>
      <div className='border-light mx-auto w-[90%] border-b' />
      <Link to={`/my-preferences`}>
        <div className=' mt-5 flex justify-between'>
          <p className='ms-[5%]'>{'My profile preferences'}</p>
          <img src='/icons/right-arrow.svg' className='me-[5%]' />
        </div>
      </Link>
      <div className='border-light mx-auto w-[90%] border-b' />
      <Link to='/cars'>
        <div className=' mt-5 flex justify-between'>
          <p className='ms-[5%]'>{'My cars'}</p>
          <img src='/icons/right-arrow.svg' className='me-[5%]' />
        </div>
      </Link>
      <div className='border-light mx-auto w-[90%] border-b' />
      <div className=' mt-5 flex justify-between'>
        <button className='ms-[5%]' onClick={Logout}>
          {'Logout'}
        </button>
        <img src='/icons/right-arrow.svg' className='me-[5%]' />
      </div>
      <div className='border-light mx-auto w-[90%] border-b' />
    </div>
  );
}
