import RecentPosts from "@/src/components/BlogHome/RecentPosts";
import HeroDoctor from "@/src/components/Doctors/HeroDoctor";
import RecentPost from "@/src/components/VideoHome/RecentPosts";
import ArticleCard from "@/src/components/ArticleCard";
import Image from "next/image";
import Podcast from "@/public/podcast.svg";
import Link from "next/link";
import WhyCard from "@/src/components/AboutUs/WhyCard";
import OfflineSection from "@/src/components/AboutUs/OfflineSection";
import AdsSection from "@/src/components/AboutUs/AdsSection";
import RecentPodcast from "@/src/components/BodcastHome/RecentPodcasts";
import api from "@/src/utils/api";
import { slug } from "github-slugger";  

export async function generateMetadata() {
  return {
    metadataBase: new URL('https://2l2ana.com'),
    title: `قلقانة المنصة العربية الاولى المختصة بصحة النساء`,
    description: `أول منصة عربية تهتم بصحة النساء في الوطن العربي. اكتشف محتوى طبي شامل، فيديوهات، مقالات، استشارات طبية، وحجز دكاترة.`,
    keywords: "منصة صحة النساء, محتوى طبي, استشارات طبية, فيديوهات طبية, مقالات طبية, حجز دكاترة, معلومات طبية, صحة النساء, استفسارات صحية",
    author: "قلقانة",
    openGraph: {
      title: `محتوى طبي | قلقانة`,
      description: `أول منصة عربية تهتم بصحة النساء في الوطن العربي. اكتشف محتوى طبي شامل، فيديوهات، مقالات، استشارات طبية، وحجز دكاترة.`,
      type: 'website',
      url: `https://2l2ana.com`,
      images: [
        {
          url: 'https://2l2ana.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile-imgr.9825690a.png&w=1080&q=75',
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
    const videoRes = await api.get('/Youtube', {
      cache: 'no-cache'  // Ensure the request bypasses the cache
    });
    const allVideos = videoRes.data.items;

    const featuredVideos = allVideos.filter(item =>
      item.youtubeLink.tags.some(tag => tag.name === "featured")
    );

    let selectedVideos = featuredVideos;
    if (featuredVideos.length < 2) {
      const remainingVideos = allVideos.filter(item =>
        !item.youtubeLink.tags.some(tag => tag.name === "featured")
      );
      selectedVideos = [
        ...featuredVideos,
        ...remainingVideos.slice(0, 2 - featuredVideos.length)
      ];
    }

    return selectedVideos.slice(0, 2);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

export async function fetchPosts() {
  try {
    const postRes = await api.get("/Post?pageSize=3", {
      cache: 'no-cache'  // Ensure the request bypasses the cache
    });
    const blogs = postRes.data.items.map((item) => ({
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
    <main className="flex flex-col md:-mt-3 lg:mt-0 items-center justify-center">
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
        <div className="relative -z-10 mt-16 md:mt-24 -mb-10 lg:mx-24 flex flex-col items-center justify-center">
          <h1 className="text-2xl md:text-3xl lg:text-5xl text-center relative">
            قسم التعلم والتوعية
          </h1>
          <p className="text-gray-500 md:text-lg md:mt-5 mt-3 mx-4 mb-24 md:mb-0 text-center">
            تعلمي واستكشفي أكتر عن صحتك الجسدية والنفسية من خلال محتوى قلقانة الطبي
          </p>
        </div>

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
