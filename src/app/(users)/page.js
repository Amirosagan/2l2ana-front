import RecentPosts from "@/src/components/BlogHome/RecentPosts";
import FeaturedPosts from "@/src/components/BlogHome/FeaturedPosts";
import HeroDoctor from "@/src/components/Doctors/HeroDoctor";
import RecentPost from "@/src/components/VideoHome/RecentPosts";
import ArticleCard from "@/src/components/ArticleCard";

export async function generateMetadata() {
  return {
    title: `اهم منصة للنساء في الوطن العربي | قلقانة`,
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

export default function Home() {
  return (
    <main className="flex flex-col md:-mt-3 lg:mt-0 items-center justify-center">
      <HeroDoctor />
      <div className="lg:-mt-60">
        <div className="mt-10"> </div>
        <RecentPosts Home={true} />
        <ArticleCard />
        <RecentPost Home={true} />
      </div>
    </main>
  );
}
