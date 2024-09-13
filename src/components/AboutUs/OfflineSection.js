import React from 'react';
import OfflineCard from './OfflineCard';
import firstCase from "@/public/first_medical_case.webp";
import secondCase from "@/public/fourth_medical_case.webp";
import thirdCase from "@/public/third-case.jpg";
import { useTranslations } from 'next-intl';

function OfflineSection() {
  const t = useTranslations('OfflineSection');

  const cases = [
    {
      img: firstCase,
      title: t('cases.0.title'),
      lists: t.raw('cases.0.lists') 
    },
    {
      img: thirdCase,
      title: t('cases.1.title'),
      lists: t.raw('cases.1.lists') 
    },
    {
      img: secondCase,
      title: t('cases.2.title'),
      lists: t.raw('cases.2.lists') 
    }
  ];

  return (
    <div className='flex justify-center items-center bg-neutral-100 md:bg-transparent w-full p-10 pb-20 flex-col'>
      <h1 className='text-2xl md:text-3xl mt-10'>
        {t('headline')}
      </h1>
      <p className='text-gray-500 text-sm md:text-base mt-5 sm:mb-5 lg:mb-0'>
        {t('subtext')}
      </p>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-6 lg:mt-16 m-auto w-full lg:w-[80%]'>
        {cases.map((item, index) => (
          <OfflineCard key={index} img={item.img} title={item.title} lists={item.lists} />
        ))}
      </div>
    </div>
  );
}

export default OfflineSection;
