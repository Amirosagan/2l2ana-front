import api from '@/src/utils/api';
import MainDoctorPageClient from './client';

export async function generateMetadata() {
  const res = await api.get('/Doctor/GetDoctors');
  const data = res.data;

  const doctorInfo = data.items.map(doctor => `${doctor.firstName} ${doctor.lastName} - ${doctor.category}`).join(', ');

  return {
    title: `احجز دكتور اونلاين | قلقانة`,
    description: `اكتشف أفضل الأطباء واستفد من الاستشارات الطبية المتخصصة. تشمل القائمة: ${doctorInfo}.`,
    keywords: "احجز دكتور, استشارة طبية, نصائح طبية, حجز استشارة طبية, طبيب اونلاين, طبيب عبر الإنترنت, حجز موعد مع دكتور, استشارة دكتور, نصائح صحية, طبيب متخصص",
    author: "قلقانة",
    openGraph: {
      title: `احجز دكتور | قلقانة`,
      description: `اكتشف أفضل الأطباء واستفد من الاستشارات الطبية المتخصصة. تشمل القائمة: ${doctorInfo}.`,
      type: 'website',
      url: `https://2l2ana.com/doctors`,
      images: [
        {
          url: 'https://2l2ana.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdoctor-image.abc123.png&w=1080&q=75', 
          width: 800,
          height: 600,
          alt: 'احجز دكتور',
        },
      ],
    },
  };
}

const MainDoctorPage = () => {
  return (
    <MainDoctorPageClient />
  );
};

export default MainDoctorPage;
