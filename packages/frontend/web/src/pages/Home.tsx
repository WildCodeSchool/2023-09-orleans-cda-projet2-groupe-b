export default function Home() {
  return (
    <div className='mt-16 sm:flex sm:h-[100vh] sm:w-full sm:flex-row sm:items-center sm:justify-center'>
      <div className='flex justify-center sm:hidden'>
        <img src='/icons/logo.svg' alt='logo' className='mt-12 w-4/5' />
      </div>
      <div className='flex h-full w-full content-center items-center justify-around md:mx-5'>
        <div className='sm:custom-container mt-[20%] flex h-[100%] flex-col items-center justify-center text-white duration-75 sm:ml-6 sm:mt-0 sm:h-[35rem] sm:w-2/4 md:mx-auto md:w-[28rem]'>
          <h1 className='text-3xl font-bold sm:mt-[20%]'>
            {'Today you are ?'}
          </h1>
          <div className='mt-[20%] flex flex-row items-center justify-center gap-8 sm:w-full'>
            <div className='flex flex-col'>
              <img
                src='/icons/passenger.svg'
                alt='passenger'
                className='h-2/4'
              />
              <p className='mt-3 text-center text-lg'>{'Passenger'}</p>
            </div>

            <div className='flex flex-col'>
              <img
                src='/icons/driver.svg'
                alt='driver'
                className='h-2/4 sm:h-full'
              />
              <p className='text-center text-lg'>{'Driver'}</p>
            </div>
          </div>
        </div>
        <div className='hidden duration-75 sm:ml-3 sm:flex sm:w-2/4 sm:items-center'>
          <img
            src='/icons/logo.svg'
            alt='logo'
            className='sm:h-44 md:mt-28 md:h-36'
          />
        </div>
      </div>
    </div>
  );
}
