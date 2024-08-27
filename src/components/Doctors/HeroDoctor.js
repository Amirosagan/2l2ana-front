import Image from "next/image";
import Link from "next/link";
import Doctors from "@/public/doctors.jpeg";

const translations = {
  en: {
    headline: 'Check your health easily from home!',
    subtext: 'To meet your health needs with the highest level of care, we offer you a selection of specialized doctors in all fields, available for online consultations via audio and video. Book your appointment now and let us take care of the rest.',
    button: 'Explore Doctors',
  },
  ar: {
    headline: '   اتطمني علي صحتك من بيتك بكل سهولة    ',
    subtext: 'لتلبية احتياجاتك الصحية بأعلى مستويات الرعاية، نقدم لك نخبة من الأطباء المتخصصين في كافة المجالات، متاحين للاستشارات عبر الإنترنت بالصوت والصورة. احجزي موعدك الآن ودعينا نتولى الباقي.',
    button: 'استكشف الدكاترة',
  },
};

const HeroDoctor = ({ language = 'ar' }) => {

  return (
    <section>
      <div className="mx-auto max-w-screen-xl lg:h-[88vh] px-4 py-2 pb-8 sm:px-6 sm:py-12 lg:px-8 lg:pt-16">
        <div className={`grid grid-cols-1   ${language === 'ar' ? 'gap-8' : 'gap-4'} lg:grid-cols-2 lg:gap-16`}>
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80  lg:h-full">
            <Image
              alt="Doctors"
              width={800}
              height={800}
              src={Doctors}
              className="absolute inset-0 h-full w-full object-cover rounded-3xl"
            />
          </div>
          <div className="lg:py-24 text-end" >
            <h2 className="text-3xl tajawal-extrabold  sm:text-5xl tracking-wider leading-normal " style={{ lineHeight: '1.5' }}>
              {translations[language]?.headline}
            </h2>
            <p className={` ${language === 'ar' ? 'md:mt-8' : 'md:mt-2'}  mt-4 md:text-lg tajawal-medium text-gray-600`}>
              {translations[language]?.subtext}
            </p>
            <Link href="/booking-Doctor" className="md:mt-8 mt-4 tajawal-bold inline-block rounded bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-primary/80 focus:outline-none">
              {translations[language]?.button}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroDoctor;
