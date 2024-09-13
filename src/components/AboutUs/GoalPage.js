import { useTranslations } from 'next-intl';
import WomenImage from '@/public/about-us.jpeg';
import Image from 'next/image';

const GoalPage = () => {
  const t = useTranslations('GoalPage'); 

  return (
    <div className="flex flex-col lg:flex-row lg:w-2/3 mx-5 md:w-[90%] justify-center items-center md:m-auto m-auto p-10 lg:-mt-5 border-2 border-primary rounded-lg bg-neutral-50">
      <div className="flex flex-col gap-10 md:w-1/2">
        <h1 className="tajawal-bold text-5xl text-primary">{t('whoWeAre')}</h1>
        <p className="tajawal-regular text-xl">{t('intro')}</p>
        <ul className="tajawal-regular text-lg list-disc ml-5">
          <li className="text-primary">{t('serviceOne')}</li>
          <li className="text-primary mt-4">{t('serviceTwo')}</li>
        </ul>
        <div>
          <h2 className="tajawal-bold text-4xl mt-8 text-primary">{t('ourGoalTitle')}</h2>
          <p className="tajawal-regular text-xl mt-2">{t('ourGoalDescription')}</p>
        </div>
      </div>
      <div className="lg:w-1/2 md:w-[90%] w-[100%] flex justify-center items-center mt-12 lg:mt-0">
        <Image className="object-cover rounded-xl" alt={t('imageAlt')} src={WomenImage} />
      </div>
    </div>
  );
};

export default GoalPage;
