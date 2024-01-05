export default function Home() {
  return (
    <div className='md:mt-18 mt-20 flex flex-col lg:mt-28 lg:flex-row-reverse lg:justify-around'>
      <img
        src='/icons/logo.svg'
        alt='logo'
        className='m-auto my-10 w-[80%] sm:mt-36 lg:w-[35rem]'
      />

      <div className='mx-auto w-[85%] from-[#FFFFFF]/10 to-[#FFFFFF]/0 md:mt-10 md:w-[40%] md:rounded-[1.5rem] md:bg-gradient-to-br md:py-5 md:shadow-2xl lg:ms-auto lg:h-[40rem] lg:w-[35rem] lg:py-5'>
        <div className='mt-5 flex justify-end text-end md:mx-auto lg:mt-[25%]'>
          <h1 className='text-light mx-auto my-10 text-4xl font-extrabold'>
            {'Today you are ?'}
          </h1>
        </div>
        <div className='mt-10 flex flex-row items-center justify-center gap-8 '>
          <div className='flex flex-col'>
            <img src='/icons/passenger.svg' alt='passenger' className='h-2/4' />
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
    </div>
  );
}
