import CoverSection from '@/src/components/VideoHome/CoverSection';
import RecentPosts from '@/src/components/VideoHome/RecentPosts';
import FeaturedPosts from '@/src/components/VideoHome/FeaturedPosts';
import DoctoorBoster from '@/src/components/AboutUs/DoctoorBoster';
import api from '@/src/utils/api';

export async function generateMetadata() {
  try {
    const res = await api.get('/Youtube', {
      cache: 'no-cache'  // Ensure the request bypasses the cache
    });
    const data = res.data;

    const titles = data.items.map(video => video.youtubeLink.title).join(', ');

    return {
      metadataBase: new URL('https://2l2ana.com'),
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
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: "Error | قلقانة",
      description: "Error generating metadata",
    };
  }
}

const VideosPage = async () => {
  let allVideos = [];
  let featuredVideos = [];
  let selectedVideos = [];
  let recentVideos = [];

  try {
    const res = await api.get('/Youtube', {
      cache: 'no-cache'  // Ensure the request bypasses the cache
    });
    allVideos = res.data.items;

    featuredVideos = allVideos.filter(item =>
      item.youtubeLink.tags.some(tag => tag.name === "featured")
    );

    if (featuredVideos.length < 2) {
      const remainingVideos = allVideos.filter(item =>
        !item.youtubeLink.tags.some(tag => tag.name === "featured")
      );
      selectedVideos = [...featuredVideos, ...remainingVideos.slice(0, 2 - featuredVideos.length)];
    } else {
      selectedVideos = featuredVideos.slice(0, 2);
    }

    recentVideos = allVideos.slice(0, 6);

  } catch (error) {
    console.error('Error fetching videos:', error);
  }

  return (
    <div className='mt-5'>
      <div className="flex flex-col items-center justify-center lg:w-[83%] m-auto">
        <CoverSection video={allVideos[0]} />
        <FeaturedPosts videos={selectedVideos} />
        <div className='w-[85%] mb-10 lg:-mt-20 lg:mb-0 m-auto'>
          <DoctoorBoster />
        </div>
        <RecentPosts videos={recentVideos} /> 
      </div>
    </div>
  );
};

export default VideosPage;
