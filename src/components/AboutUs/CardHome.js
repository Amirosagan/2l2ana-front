import React from 'react';
import Image from 'next/image';

function CardHome({ number, icon, title, paragraph }) {
  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='relative h-24 w-24 md:h-28 md:w-32 bg-primary rounded-lg flex items-center justify-center'>
        <div className='absolute -top-2 -right-2 tajawal-bold bg-orange-400  text-white rounded-full h-8 w-8 flex items-center justify-center'>
          {number}
        </div>
        <div className='text-white'>
          <Image src={icon.src} alt={title} width={40} height={40} />
        </div>
      </div>
      <div className='mt-5 text-center'>
        <h1 className='md:text-xl '> {title} </h1>
        <p className='md:w-[80%] m-auto md:mt-4 mt-1 text-gray-500 mx-5 text-sm md:text-base'> {paragraph} </p>
      </div>
    </div>
  );
}

export default CardHome;
