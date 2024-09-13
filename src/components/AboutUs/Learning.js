import { useTranslations } from 'next-intl';

const Learning = () => {
  const t = useTranslations('Learning');

  return (
    <div className="relative -z-10 mt-16 md:mt-24 -mb-10 lg:mx-24 flex flex-col items-center justify-center">
      <h1 className="text-2xl md:text-3xl lg:text-5xl text-center relative">
        {t('title')} 
      </h1>
      <p className="text-gray-500 md:text-lg md:mt-5 mt-3 mx-4 mb-24 md:mb-0 text-center">
        {t('description')}
      </p>
    </div>
  );
}

export default Learning;
