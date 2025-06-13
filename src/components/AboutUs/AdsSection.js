"use client";
import Image from "next/image";
import { Link } from '@/src/i18n/routing';
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useTranslations } from 'next-intl';

function AdsSection() {
  const t = useTranslations('AdsSection');

  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "/review-1.jpg",
    "/review-2.jpg",
    "/review-3.jpg",
    "/review-4.jpg",
    "/review-5.jpg",
    "/review-6.jpg",
    "/review-7.jpg",
    "/review-8.jpg",
    "/review-9.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); 

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
      <h1 className="md:text-4xl text-2xl md:block text-center text-primary">{t('title')}</h1>
      <p className="text-center mt-2  md:block mb-10 text-gray-500">
        {t('description')}
      </p>

      <div className='flex justify-center relative'>
        <div className='overflow-hidden'>
          <Link href="/booking-Doctor">
            <Image
              alt='مراجعة عميلة'
              className='object-contain lg:h-[400px] w-full transition-all duration-500'
              src={images[currentImage]}
              width={800}
              height={400}
            />
          </Link>
        </div>

        <div className='absolute hidden lg:block left-[150px] xl:left-[300px] top-1/2 transform -translate-y-1/2'>
          <button onClick={handlePrevClick} className='text-primary text-4xl'>
            <FaChevronLeft />
          </button>
        </div>

        <div className='absolute right-[150px] xl:right-[300px] hidden lg:block top-1/2 transform -translate-y-1/2'>
          <button onClick={handleNextClick} className='text-primary text-4xl'>
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdsSection;
