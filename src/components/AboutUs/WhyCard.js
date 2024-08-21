import React from 'react';
import CardHome from './CardHome';
import firstcard from "@/public/card1.svg";
import secondcard from "@/public/card2.svg";
import thirdcard from "@/public/card3.svg";
import fourthcard from "@/public/card4.svg";
import road from "@/public/road.svg";
import road2 from "@/public/road2.svg";
import Image from 'next/image';


function WhyCard() {
  return (
    <div className="flex flex-col items-center w-full py-10 pb-20 bg-neutral-100">
      <h1 className="text-2xl  md:text-3xl lg:text-4xl md:mb-20 mt-5 md:mt-10">ليه تستخدمي قلقانة ؟</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:mt-16 sm:mt-0 mt-10 w-full lg:w-[80%] relative">
        
        <div className='relative'>
          <CardHome 
            number="1" 
            icon={firstcard} 
            title="خدمة 24 ساعة علي مدار الأسبوع" 
            paragraph="لا داعي للانتظار في العيادات. تواصل مع أفضل الأطباء وعلى مدار الساعة." 
          />
        </div>
        
        <div className='relative lg:-mt-16'> 
        <div className="absolute hidden lg:block right-[-110px] top-[100px] transform -translate-y-1/2 text-primary text-3xl">
            <Image src={road} alt='road'/>
          </div>
          <CardHome 
            number="2" 
            icon={secondcard} 
            title="خصوصية وأمان" 
            paragraph="نحرص على خصوصية معلوماتك الصحية ونستخدم أحدث التقنيات لضمان أمان بياناتك." 
          />
         
        </div>
        
        <div className='relative'>
        <div className="absolute hidden lg:block right-[-110px]  transform -translate-y-1/2 text-primary text-3xl">
        <Image src={road2} alt='road'/>
          </div>
          <CardHome 
            number="3" 
            icon={thirdcard} 
            title="أطباء معتمدين" 
            paragraph="استشارات طبية مباشرة مع الأطباء من خلال الفيديو او المكالمات الصوتية." 
          />
         
        </div>
        
        <div className='relative lg:-mt-16'> 
        <div className="absolute hidden lg:block right-[-110px] top-[100px] transform -translate-y-1/2 text-primary text-3xl">
        <Image src={road} alt='road'/>
          </div>
          <CardHome 
            number="4" 
            icon={fourthcard} 
            title="تكلفة مناسبة" 
            paragraph="خدمات رعاية صحية بباقات مختلفة تناسب احتياجاتك." 
          />
        </div>
      </div>
    </div>
  );
}

export default WhyCard;
