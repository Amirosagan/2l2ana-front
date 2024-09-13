import Image from "next/image";
import { Link } from '@/src/i18n/routing';
import Doctors from "@/public/doctors.jpeg";
import { useTranslations } from 'next-intl';

const HeroDoctor = () => {
  const t = useTranslations('HeroDoctor'); 

  return (
    <section>
      <div className="mx-auto max-w-screen-xl lg:h-screen px-4 py-2 pb-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-[528px] ">
            <Image
              alt=""
              width={800}
              height={800}
              src={Doctors}
              className="absolute inset-0 h-full w-full object-cover rounded-3xl"
            />
          </div>
          <div className="lg:py-24">
            <h2 className="text-3xl tajawal-extrabold sm:text-5xl tracking-wider leading-normal lg:w-[88%]" style={{ lineHeight: '1.5' }}>
              {t('headlinePart1')} <span className="text-primary">{t('health')}</span> {t('headlinePart2')}
            </h2>
            <p className="md:mt-8 mt-4 md:text-lg tajawal-medium text-gray-600">
              {t('description')}
            </p>
            <Link href="/booking-Doctor" className="md:mt-8 mt-4 tajawal-bold inline-block rounded bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-primary/80 focus:outline-none">
              {t('exploreDoctors')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroDoctor;
