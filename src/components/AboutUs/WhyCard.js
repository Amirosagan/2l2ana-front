import React from 'react';
import CardHome from './CardHome';
import { Users, ShieldCheck, Clock, NotebookPen } from 'lucide-react'; 
import road from "@/public/road.svg";
import road2 from "@/public/road2.svg";
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

function WhyCard() {
  const t = useTranslations('WhyCard');
  const locale = useLocale();
  const rotationClass = locale === 'en' ? 'rotate-180' : '';
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
            icon={Users} 
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
            icon={ShieldCheck} 
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
            icon={NotebookPen} 
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
            icon={Clock} 
            title={t('cards.3.title')} 
            paragraph={t('cards.3.paragraph')} 
          />
        </div>

      </div>
    </div>
  );
}

export default WhyCard;
