"use client";
import ads1 from "@/public/ads1.jpeg";
import ads2 from "@/public/ads2.jpeg";
import ads3 from "@/public/ads3.jpeg";
import ads4 from "@/public/ads4.jpeg";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function AdsSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [ads3, ads4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrevClick = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextClick = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  return (
    <div className='md:py-20 w-full bg-neutral-100'> 
            <h1 className=" md:text-4xl  hidden md:block text-center "> افضل عروض قلقانة </h1>
            <p className="text-center mt-2 hidden md:block  mb-10 text-gray-500" > لأن رعايتك الصحية أهم حاجة عندنا وفرنالك افضل العروض سواء اونلاين او اوفلاين لعملاء قلقانة فقط </p>

      <div className='flex justify-center   relative '>
        
        <div className='    overflow-hidden '>
        <Link href="booking-Doctor"> 
          <Image alt='خصومات قلقانة' className='  hidden object-contain lg:h-[400px] lg:w-full' src={ads2} />
        </Link>
        </div>
        <div className='  overflow-hidden '>
        <Link href="booking-Doctor"> 
          <Image alt='خصومات قلقانة' className=' hidden  object-contain lg:h-[400px] mx-10 lg:w-full' src={ads1} />
        </Link>
        </div>
        <div className='    overflow-hidden '>
            <Link href="booking-Doctor"> 
          <Image alt='خصومات قلقانة' className='  object-contain w-[100vh] lg:h-[500px] lg:w-[600px]' src={images[currentImage]} />
          </Link>
        </div>
       

        <div className='absolute hidden md:block left-[320px] top-1/2 transform -translate-y-1/2'>
          <button onClick={handlePrevClick} className='text-primary text-4xl'>
            <FaChevronLeft />
          </button>
        </div>
        <div className='absolute right-[320px]  hidden md:block top-1/2 transform -translate-y-1/2'>
          <button onClick={handleNextClick} className='text-primary text-4xl'>
            <FaChevronRight />
          </button>
        </div> 
      </div>
    </div>
  );
}

export default AdsSection;
