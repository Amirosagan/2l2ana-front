import Image from "next/image";
import Link from "next/link";
import Doctors from "@/public/Doctors.jpg";

const HeroDoctor = ({ onExploreClick }) => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl lg:h-screen px-4 py-2 pb-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
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
              اتطمني على <span className="text-primary">صحتك</span> من بيتك بكل سهولة!
            </h2>
            <p className="md:mt-8 mt-4 md:text-lg tajawal-medium text-gray-600">
              لتلبية احتياجاتك الصحية بأعلى مستويات الرعاية، نقدم لك نخبة من الأطباء المتخصصين في كافة المجالات، متاحين للاستشارات عبر الإنترنت بالصوت والصورة. احجزي موعدك الآن ودعينا نتولى الباقي.
            </p>
            <Link href="/booking-Doctor"  className="md:mt-8 mt-4  tajawal-bold inline-block rounded bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-teal-800 focus:outline-none">
              
                استكشف الدكاترة
              
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroDoctor;
