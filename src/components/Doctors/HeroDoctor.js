import Image from "next/image";
import { Link } from '@/src/i18n/routing';
import Doctors from "@/public/4.png";
import { useLocale, useTranslations } from 'next-intl';

const HeroDoctor = () => {
  const t = useTranslations('HeroDoctor');
  const locale = useLocale();

  // Determine the prefix to use based on the locale
  const fontClassPrefix = locale === 'ar' ? 'tajawal-' : 'font-';

  // Conditionally apply margin for the p tag (md:mt-8 if 'ar', mt-1 otherwise)
  const pMarginClass = locale === 'ar' ? 'md:mt-8 mt-4' : 'md:mt-8 mt-2';

  // Conditionally apply margin for the grid container (if not 'ar' add -mt-5 md:mt-0)
  const gridMarginClass = locale !== 'ar' ? '-mt-5 md:mt-0' : '';

  const griddMarginClass = locale !== 'ar' ? 'lg:-mt-7 ' : '';

  // Conditionally apply margin for the link (if not 'ar', mt-3, if 'ar', mt-4)
  const linkMarginClass = locale === 'ar' ? 'mt-6' : 'mt-3';

  return (
    <section>
      <div className="mx-auto max-w-screen-xl lg:h-screen px-4 py-2 pb-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16 ${griddMarginClass}`}>
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-[528px] ">
            <Image
              alt="Doctors"
              width={800}
              height={800}
              src={Doctors}
              className="absolute inset-0 h-full w-full object-cover object-top lg:object-center rounded-3xl"
            />
          </div>
          <div className="lg:py-24">
            <h2
              className={`${fontClassPrefix}extrabold  ${gridMarginClass} text-3xl sm:text-5xl tracking-wider leading-[1.3] md:leading-[1.5] lg:w-[88%]`}
            >
              {t('headlinePart1')} <span className="text-primary">{t('health')}</span> {t('headlinePart2')}
            </h2>
            <p className={`${pMarginClass} md:text-lg ${fontClassPrefix}medium text-gray-600`}>
              {t('description')}
            </p>
            <Link
              href="/booking-Doctor"
              className={`md:mt-8 ${linkMarginClass} ${fontClassPrefix}bold inline-block rounded bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-primary/80 focus:outline-none`}
            >
              {t('exploreDoctors')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroDoctor;
