import Image from "next/image";
import DoctorImage from "@/public/consult.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from 'next-intl';

const DoctoorBoster = () => {
  const t = useTranslations('DoctoorBoster');

  return (
    <div id="ad" className="md:mt-40 mt-10 flex flex-col md:flex-row  md:h-[400px] lg:h-[500px] bg-primary">
      
     

      {/* محتوى النص */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-10">
        <h1 className="md:text-[36px] text-white text-[23px] tajawal-bold leading-relaxed">
          {t('onlineConsultation')}
        </h1>

        <Link href="/booking-Doctor" className="mt-6 md:mt-10 self-start md:self-end lg:self-start">
          <Button className="bg-accent flex  text-white text-lg md:text-xl tajawal-bold px-6 py-7">
            {t('seeDoctors')}
          </Button>
        </Link>
      </div>
       {/* صورة الطبيب */}
      <div className="relative w-full hidden md:block md:w-1/2 h-64 md:h-full">
        <Image
          src={DoctorImage}
          alt={t('doctorImageAlt')}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default DoctoorBoster;
