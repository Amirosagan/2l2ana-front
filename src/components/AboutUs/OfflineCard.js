import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function OfflineCard({ img, title, lists }) {
  return (
    <div className='flex flex-col '>
      <Image src={img} alt="الحالات الطبية" className='w-[300px] rounded-xl h-[200px]' />
      <Link href="booking-Doctor"> 
      <h1 className='text-xl md:text-2xl hover:text-primary transition-all duration-300 mt-4 md:my-4 '>{title}</h1>
      </Link>
      <ul className=''>
        {lists.map((item, index) => (
            <Link href="booking-Doctor">
          <li key={index} className='my-1 md:text-lg'>
            <span className='text-primary'>•</span>
            <span className='text-black tajawal-regular  hover:text-primary duration-300 transition-all'> {item}</span>
          </li>
          </Link>
        ))}
      </ul>
    </div> 
  )
}

export default OfflineCard
