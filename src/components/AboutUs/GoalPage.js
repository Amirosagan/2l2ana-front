import { useTranslations } from 'next-intl';

const GoalPage = () => {
  const t = useTranslations('GoalPage');

  return (
    <div className="flex flex-col lg:flex-row lg:w-2/3 mx-5 md:w-[90%] justify-center items-center md:m-auto m-auto p-10 lg:-mt-5 border-2 border-primary rounded-lg bg-neutral-50">
      <div className="flex flex-col gap-10 ">
        <h1 className="tajawal-bold text-4xl text-center">
          {t('whoWeAre')} <span className='text-primary'>{t('brandName')}</span>
          <span className='text-2xl'> {t('slogan')}</span>
        </h1>
        <span className='text-xl text-center -mt-7 tajawal-medium text-slate-600'>{t('tagline')}</span>

        <p className="tajawal-regular text-xl">{t('paragraph1')}</p>
        <p className="tajawal-regular text-xl">{t('paragraph2')}</p>

        <div>
          <h2 className="tajawal-bold text-4xl mt-8 text-primary">{t('whyUsTitle')}</h2>

          <p className="tajawal-semibold text-xl text-primary mt-4">{t('whyUsPrivacyTitle')}</p>
          <p className="tajawal-regular text-lg mt-1">{t('whyUsPrivacyText')}</p>

          <p className="tajawal-semibold text-xl text-primary mt-4">{t('whyUsCareTitle')}</p>
          <p className="tajawal-regular text-lg mt-1">{t('whyUsCareText')}</p>

          <p className="tajawal-semibold text-xl text-primary mt-4">{t('whyUsSupportTitle')}</p>
          <p className="tajawal-regular text-lg mt-1">{t('whyUsSupportText')}</p>

          <p className="tajawal-semibold text-xl text-primary mt-4">{t('whyUsCommunityTitle')}</p>
          <p className="tajawal-regular text-lg mt-1">{t('whyUsCommunityText')}</p>
        </div>

        <div>
          <h2 className="tajawal-bold text-4xl mt-8 text-primary">{t('missionTitle')}</h2>
          <p className="tajawal-regular text-xl mt-2">{t('missionText')}</p>
        </div>
      </div>

      {/* <div className="lg:w-1/2 md:w-[90%] w-[100%] flex justify-center items-center mt-12 lg:mt-0">
        <Image className="object-cover rounded-xl" alt="هدفنا" src={WomenImage} />
      </div> */}
    </div>
  );
};

export default GoalPage;