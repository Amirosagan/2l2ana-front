import RecentPosts from "@/src/components/BlogHome/RecentPosts";
import HeroDoctor from "@/src/components/Doctors/HeroDoctor";
import RecentPost from "@/src/components/VideoHome/RecentPosts";
import ArticleCard from "@/src/components/ArticleCard";
import Image from "next/image";
import Podcast from "@/public/podcastt.png";
import WhyCard from "@/src/components/AboutUs/WhyCard";
import OfflineSection from "@/src/components/AboutUs/OfflineSection";
import AdsSection from "@/src/components/AboutUs/AdsSection";
import RecentPodcast from "@/src/components/BodcastHome/RecentPodcasts";
import { slug } from "github-slugger";
import Learning from "@/src/components/AboutUs/Learning";
import { Link } from "@/src/i18n/routing";

export async function generateMetadata() {
  return {
    metadataBase: new URL('https://mettamena.com'),
    title: `متطمنة المنصة العربية الاولى المختصة بصحة النساء`,
    description: `أول منصة عربية تهتم بصحة النساء في الوطن العربي. اكتشف محتوى طبي شامل، فيديوهات، مقالات، استشارات طبية، وحجز دكاترة.`,
    keywords: "منصة صحة النساء, محتوى طبي, استشارات طبية, فيديوهات طبية, مقالات طبية, حجز دكاترة, معلومات طبية, صحة النساء, استفسارات صحية",
    author: "متطمنة",
    openGraph: {
      title: `محتوى طبي | متطمنة`,
      description: `أول منصة عربية تهتم بصحة النساء في الوطن العربي. اكتشف محتوى طبي شامل، فيديوهات، مقالات، استشارات طبية، وحجز دكاترة.`,
      type: 'website',
      url: `https://mettamena.com`,
      images: [
        {
          url: 'https://mettamena.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile-imgr.9825690a.png&w=1080&q=75',
          width: 800,
          height: 600,
          alt: 'محتوى طبي',
        },
      ],
    },
  };
}

export async function fetchVideos() {
  try {
    const response = await fetch('https://api.mettamena.com/api/Youtube', {
      cache: 'no-cache',  // Ensure the request bypasses the cache
    });
    const data = await response.json();
    const allVideos = data.items;

    // Filter for featured videos
    const featuredVideos = allVideos.filter(item =>
      item.youtubeLink.tags.some(tag => tag.name === "featured")
    );

    // Fill up to 3 videos using non-featured if needed
    const selectedVideos = featuredVideos.length >= 3
      ? featuredVideos.slice(0, 3)
      : [
          ...featuredVideos,
          ...allVideos
            .filter(item => !item.youtubeLink.tags.some(tag => tag.name === "featured"))
            .slice(0, 3 - featuredVideos.length),
        ];

    return selectedVideos;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

export async function fetchPosts() {
  try {
    const response = await fetch('https://api.mettamena.com/api/Post?pageSize=3', {
      cache: 'no-cache',
    });
    const data = await response.json();
    const blogs = data.items.map((item) => ({
      id: item.id,
      title: item.title,
      publishedAt: item.createdAt,
      image: {
        filePath: item.imageUrl,
        blurhashDataUrl: '',
        width: 800,
        height: 600,
      },
      tags: item.tags.map((tag) => tag.name),
      url: `/blogs/${slug(item.id)}`,
    }));

    return blogs;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function Home() {
  const recentVideos = await fetchVideos();
  const recentPosts = await fetchPosts();

  return (
    <main className="flex flex-col md:-mt-5 lg:mt-0 -mt-5  items-center justify-center">
      <HeroDoctor />
      <WhyCard />

      <div className="md:hidden">
        <ArticleCard />
      </div>

      <OfflineSection />

      <div className="hidden md:block w-full">
        <ArticleCard />
      </div>

      <AdsSection />

      <div className="lg:pb-16 lg:px-28">
        
        <Learning/>

        <RecentPosts Home={true} blogs={recentPosts} />

        <div className="mx-5 lg:mx-24 rounded-lg mt-10 mb-10">
          <Link href="/podcasts">
            <Image alt="Podcast" className="rounded-lg md:hidden" src={Podcast} />
          </Link>
        </div>

        <RecentPost videos={recentVideos} Home={true} />

        <div className="hidden md:block">
          <RecentPodcast Home={true} />
        </div>
      </div>
    </main>
  );
}
