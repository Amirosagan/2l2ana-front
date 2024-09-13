import React from "react";
import NewsletterForm from "./NewsletterForm";
import { useTranslations } from 'next-intl';

const Sletter = () => {
  const t = useTranslations('Newsletter');

  return (
    <footer className="w-full lg:w-[80%] lg:-mt-0 bg-primary py-4 sm:mb-10 flex flex-col items-center text-light">
      <h3 className="tajawal-medium mt-8 font-medium text-center capitalize text-2xl sm:text-3xl lg:text-4xl px-4">
        {t('heading')}
      </h3>
      <p className="mt-5 px-4 text-center w-full sm:w-3/5 font-light text-sm sm:text-base">
        {t('description')}
      </p>

      <NewsletterForm />
    </footer>
  );
};

export default Sletter;
