import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import MyInfo from '@/pages/MyInfo';
import MyOpinions from '@/pages/MyOpinions';
import MyPreferences from '@/pages/MyPreferences';
import type { ModalState } from '@/types/modal';

import { useAuth } from '../contexts/AuthContext';
import { Modal } from './Modal';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [openModals, setOpenModals] = useState<ModalState>({
    myInfo: false,
    myOpinions: false,
    myPreferences: false,
  });

  const openModal = (modalKey: keyof ModalState) => {
    setOpenModals((prevModals) => ({
      ...prevModals,
      [modalKey]: true,
    }));
  };

  const closeModal = (modalKey: keyof ModalState) => {
    setOpenModals((prevModals) => ({
      ...prevModals,
      [modalKey]: false,
    }));
  };

  return (
    <div className='sm:bg-custom-gradient sm:shadow-custom bg-primary text-light fixed bottom-0 mb-2 ml-[8%] flex w-[84.5%] flex-row justify-start rounded-full border-solid duration-75 sm:top-0 sm:mx-0 sm:h-16 sm:w-full sm:justify-between sm:rounded-none'>
      <div className='ml-[8%] mr-[8%] mt-5 duration-75 sm:mt-2 sm:w-[20%] md:mt-2 md:w-[10%]'>
        <Link to={'/'}>
          <img
            src='/icons/home.svg'
            alt='home'
            className='w-7 sm:hidden md:hidden'
          />
          <img
            src='/icons/logo.svg'
            alt='logo'
            className='hidden h-full sm:block md:block'
          />
        </Link>
      </div>
      <div className='flex flex-row justify-center gap-[3rem] sm:gap-14'>
        <div className='mt-6 hidden h-0 w-0 duration-75 sm:mt-2 sm:flex sm:h-full sm:w-full sm:flex-col'>
          <img src='/icons/publish.svg' alt='publish' className='h-7 w-full' />
          <p className='text-center'>{'Publish'}</p>
        </div>
        <div className='mt-6 duration-75 sm:mt-2 sm:flex sm:h-full sm:w-full sm:flex-col'>
          <img src='/icons/message.svg' alt='message' className='h-7 w-full' />
          <p className='invisible text-center sm:visible md:visible'>
            {'Message'}
          </p>
        </div>
        <div className='mt-6 duration-75 sm:mt-2 sm:flex sm:h-full sm:w-full sm:flex-col'>
          <img src='/icons/trip.svg' alt='trip' className='h-7 w-full' />
          <p className='invisible text-center sm:visible'>{'Trip'}</p>
        </div>

        {isLoggedIn ? (
          <>
            <div className='mt-6 duration-75 sm:hidden'>
              <Link to='/profile'>
                <img
                  src='/icons/profil.svg'
                  alt='profil'
                  className='h-7 w-full'
                />
              </Link>
            </div>
            <div
              onMouseEnter={() => {
                setIsOpen(true);
              }}
              onMouseLeave={() => {
                setIsOpen(false);
              }}
              className='hidden cursor-pointer duration-75 sm:mr-5 sm:mt-2 sm:flex sm:h-full sm:w-full sm:flex-row'
            >
              <div className='flex flex-col'>
                <img
                  src='/icons/profil.svg'
                  alt='profil'
                  className='h-7 w-full'
                />
                <p className='invisible text-center sm:visible md:visible'>
                  {'Profil'}
                </p>
              </div>
              <img
                src='/icons/arrow-down.svg'
                alt='arrow-down'
                className='ml-1 mr-12 mt-4'
              />
              {isOpen ? (
                <div className='aria-hidden bg-custom-gradient shadow-custom fixed right-2 top-14 mt-2 w-60 rounded-md border'>
                  <ul className='mb-2 ml-3 mr-6 mt-3'>
                    <li className='flex w-full flex-row justify-between'>
                      <button
                        onClick={() => {
                          openModal('myInfo');
                        }}
                      >
                        {'My informations'}
                      </button>
                      <Modal
                        openModal={openModals.myInfo}
                        onClose={() => {
                          closeModal('myInfo');
                        }}
                      >
                        <MyInfo />
                      </Modal>
                      <img src='/icons/right-arrow.svg' alt='right-arrow' />
                    </li>
                    <li className='flex w-full flex-row justify-between'>
                      <button
                        onClick={() => {
                          openModal('myOpinions');
                        }}
                      >
                        {'My opinions'}
                      </button>
                      <Modal
                        openModal={openModals.myOpinions}
                        onClose={() => {
                          closeModal('myOpinions');
                        }}
                      >
                        <MyOpinions />
                      </Modal>
                      <img src='/icons/right-arrow.svg' alt='right-arrow' />
                    </li>
                    <li className='flex w-full flex-row justify-between'>
                      <button
                        onClick={() => {
                          openModal('myPreferences');
                        }}
                      >
                        {'My preferences'}
                      </button>
                      <Modal
                        openModal={openModals.myPreferences}
                        onClose={() => {
                          closeModal('myPreferences');
                        }}
                      >
                        <MyPreferences />
                      </Modal>
                      <img src='/icons/right-arrow.svg' alt='right-arrow' />
                    </li>
                    <li className='flex w-full flex-row justify-between'>
                      <Link to='/my-car'>
                        <p>{'My cars'}</p>
                      </Link>
                      <img src='/icons/right-arrow.svg' alt='right-arrow' />
                    </li>
                    <li className='flex w-full flex-row justify-between'>
                      <button
                        onClick={async () => {
                          try {
                            const response = await fetch(
                              `${import.meta.env.VITE_API_URL}/auth/logout`,
                              { method: 'POST', credentials: 'include' },
                            );

                            if (response.ok) {
                              setIsLoggedIn(false);
                              navigate('/login');
                            } else {
                              console.error('Logout failure');
                            }
                          } catch (error) {
                            console.error('disconnection error', error);
                          }
                        }}
                      >
                        {'Logout'}
                      </button>
                      <img src='/icons/right-arrow.svg' alt='right-arrow' />
                    </li>
                  </ul>
                </div>
              ) : undefined}
            </div>
          </>
        ) : (
          <>
            <div className='mt-6 duration-75 sm:hidden'>
              <Link to='/login'>
                <img
                  src='/icons/login.svg'
                  alt='connect'
                  className='h-7 w-full'
                />
              </Link>
            </div>

            <div className='hidden sm:mr-5 sm:flex sm:flex-col sm:items-center sm:justify-end'>
              <img
                src='/icons/login.svg'
                alt='connect'
                className='h-7 w-full'
              />
              <Link to='/login'>{'Login'}</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
