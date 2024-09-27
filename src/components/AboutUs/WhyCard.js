import React from 'react';
import CardHome from './CardHome';
import firstcard from "@/public/card1.svg";
import secondcard from "@/public/card2.svg";
import thirdcard from "@/public/card3.svg";
import fourthcard from "@/public/card4.svg";
import road from "@/public/road.svg";
import road2 from "@/public/road2.svg";
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

function WhyCard() {
  const t = useTranslations('WhyCard');
  const locale = useLocale(); // Get the current locale

  // Conditional class to rotate the image by 180 degrees if the locale is 'en'
  const rotationClass = locale === 'en' ? 'rotate-180' : '';

  // Conditionally reverse the order of the cards for RTL languages (like Arabic)
  const isRTL = locale !== 'en';
  const cardOrderClass = isRTL ? 'lg:flex-row-reverse' : 'lg:flex-row';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="flex flex-col items-center w-full py-10 pb-20 bg-neutral-100">
      <h1 className="text-2xl md:text-3xl lg:text-4xl md:mb-20 mt-5 md:mt-10">
        {t('headline')}
      </h1>
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:mt-16 sm:mt-0 mt-10 w-full lg:w-[80%] relative ${cardOrderClass}`}>
        
        <div className='relative'>
          <CardHome 
            number={t('cards.0.number')} 
            icon={firstcard} 
            title={t('cards.0.title')} 
            paragraph={t('cards.0.paragraph')} 
          />
           {locale === 'en' && (
            <div className={`absolute hidden lg:block top-[40px] right-[-110px] transform -translate-y-1/2 text-primary text-3xl ${rotationClass}`}>
            <Image src={road2} alt='road'/>
          </div>
          )}
        </div>
        
        <div className='relative lg:-mt-16'> 
          <div className={`absolute hidden lg:block ${locale === 'en' && 'top-20'} right-[-110px] top-[100px] transform -translate-y-1/2 text-primary text-3xl ${rotationClass}`}>
            <Image src={road} alt='road'/>
          </div>
          
          <CardHome 
            number={t('cards.1.number')} 
            icon={secondcard} 
            title={t('cards.1.title')} 
            paragraph={t('cards.1.paragraph')} 
          />
        </div>
        
        <div className='relative'>
          <div className={`absolute hidden lg:block ${locale === 'en' && 'top-10'} right-[-110px] transform -translate-y-1/2 text-primary text-3xl ${rotationClass}`}>
            <Image src={road2} alt='road'/>
          </div>
          <CardHome 
            number={t('cards.2.number')} 
            icon={thirdcard} 
            title={t('cards.2.title')} 
            paragraph={t('cards.2.paragraph')} 
          />
        </div>
        
        <div className='relative lg:-mt-16'> 
        {locale !== 'en' && (
            <div className={`absolute hidden lg:block right-[-110px] top-[100px] transform -translate-y-1/2 text-primary text-3xl`}>
              <Image src={road} alt='road'/>
            </div>
          )}
          
          <CardHome 
            number={t('cards.3.number')} 
            icon={fourthcard} 
            title={t('cards.3.title')} 
            paragraph={t('cards.3.paragraph')} 
          />
          
        </div>
      </div>
    </div>
  );
}

export default WhyCard;
