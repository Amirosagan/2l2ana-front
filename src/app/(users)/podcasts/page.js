import api from '@/src/utils/api';
import CoverSection from '@/src/components/BodcastHome/CoverSection';
import RecentPodcast from '@/src/components/BodcastHome/RecentPodcasts';
import Link from 'next/link';

export async function generateMetadata() {
  const res = await api.get('/Youtube');
  const data = res.data;

  const titles = data.items.map(video => video.youtubeLink.title).join(', ');

  return {
    title: `بودكاست طبي | قلقانة`,
    description: `شاهد العديد من المقاطع الطبية واحصل على معلومات مفيدة. تشمل المواضيع: ${titles}.`,
    keywords: "حجز دكتور, فيديوهات طبية, استشارة طبية, نصائح طبية, استفسارات صحية, دكتور اونلاين, دكتور عبر الإنترنت, حجز استشارة طبية, فيديو طبي, طبيب استشاري, نصيحة طبية, استفسار طبي, حجز موعد مع دكتور, استشارة دكتور,  بودكاست , بودكاسست طبي , طبي , تعليمي  , صحة الاطفال ,  نصائح صحية, طبيب متخصص, استفسارات طبية شائعة, book doctor, medical videos, doctor consultation, medical advice, health queries, online doctor, doctor appointment, medical consultation, medical videos, professional medical advice",
    author: "قلقانة",
    openGraph: {
      title: `بودكاست طبي | قلقانة`,
      description: `شاهد العديد من المقاطع الطبية واحصل على معلومات مفيدة. تشمل المواضيع: ${titles}.`,
      type: 'website',
      url: `https://2l2ana.com/podcast`,
      images: [
        {
          url: 'https://2l2ana.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile-imgr.9825690a.png&w=1080&q=75', 
          width: 800,
          height: 600,
          alt: 'بودكاست طبي',
        },
      ],
    },
  };
}

const VideosPage = async () => {
  const res = await api.get('/Youtube');
  const videos = res.data.items;

  return (
    <div className='mt-5'>
      <div className="flex flex-col items-center justify-center lg:w-[83%] m-auto ">
        <CoverSection />
        <div className='flex items-center  justify-start w-[90%] lg:w-[83%] lg:-mb-5 mb-10 mt-5  text-sm md:text-base'> <Link href="/booking-Doctor" className='tajawal-medium hover:underline transition-all duration-300 text-accent'> محتار في استشارة ؟ احجز مكالمة صوتية او فيديو الان مع افضل الدكاترة في مصر من بيتك  </Link> </div>
         <RecentPodcast  />
      </div>
    </div>
  );
};

export default VideosPage;
