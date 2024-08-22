import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function OfflineCard({ img, title, lists }) {
  return (
    <div className='flex flex-col md:items-baseline w-full '>
      <Image src={img} alt="الحالات الطبية" className='w-[300px] md:self-center rounded-xl h-[200px]' />
       <div className='flex md:self-center flex-col md:items-start md:w-[70%]'> 
      <Link href="booking-Doctor" >
        <h1 className='text-xl md:text-2xl  hover:text-primary  transition-all duration-300 mt-4 md:my-4'>
          {title}
        </h1>
      </Link>
      <ul>
        {lists.map((item, index) => (
          <Link href="booking-Doctor" key={index}>
            <li className='my-1 md:text-lg'>
              <span className='text-primary mx-2'>•</span>
              <span className='text-black tajawal-regular hover:text-primary duration-300 transition-all'>
                {item}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default OfflineCard;
