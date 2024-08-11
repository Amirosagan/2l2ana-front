

import CoverSection from '@/src/components/VideoHome/CoverSection';
import RecentPosts from '@/src/components/VideoHome/RecentPosts';
import FeaturedPosts from '@/src/components/VideoHome/FeaturedPosts';
import DoctoorBoster from '@/src/components/AboutUs/DoctoorBoster';
import api from '@/src/utils/api';

export async function generateMetadata() {
  const res = await api.get('/Youtube');
  const data = res.data;

  const titles = data.items.map(video => video.youtubeLink.title).join(', ');

  return {
    title: `فيديوهات طبية | قلقانة`,
    description: `شاهد الفيديوهات الطبية واحصل على معلومات مفيدة. تشمل المواضيع: ${titles}.`,
    keywords: "حجز دكتور, فيديوهات طبية, استشارة طبية, نصائح طبية, استفسارات صحية, دكتور اونلاين, دكتور عبر الإنترنت, حجز استشارة طبية, فيديو طبي, طبيب استشاري, نصيحة طبية, استفسار طبي, حجز موعد مع دكتور, استشارة دكتور, نصائح صحية, طبيب متخصص, استفسارات طبية شائعة, book doctor, medical videos, doctor consultation, medical advice, health queries, online doctor, doctor appointment, medical consultation, medical videos, professional medical advice",
    author: "قلقانة",
    openGraph: {
      title: `فيديوهات طبية | قلقانة`,
      description: `شاهد الفيديوهات الطبية واحصل على معلومات مفيدة. تشمل المواضيع: ${titles}.`,
      type: 'website',
      url: `https://2l2ana.com/videos`,
      images: [
        {
          url: 'https://2l2ana.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile-imgr.9825690a.png&w=1080&q=75', 
          width: 800,
          height: 600,
          alt: 'فيديوهات طبية',
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
        <FeaturedPosts  />
        <div className=' w-[85%] mb-10 lg:-mt-20 lg:mb-0 m-auto'>
          <DoctoorBoster />
        </div>
        <RecentPosts  />
      </div>
    </div>
  );
};

export default VideosPage;
