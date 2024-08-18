import RecentPosts from "@/src/components/BlogHome/RecentPosts";
import HeroDoctor from "@/src/components/Doctors/HeroDoctor";
import RecentPost from "@/src/components/VideoHome/RecentPosts";
import ArticleCard from "@/src/components/ArticleCard";
import Image from "next/image";
import Podcast from "@/public/podcast.svg"
import Link from "next/link";

export async function generateMetadata() {
  return {
    title: ` قلقانة المنصة العربية الاولي المختصة بصحة النساء `,
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
      <div className="lg:-mt-60 lg:mx-28">
        <div className="mt-10"> </div>
        <RecentPosts Home={true} />
        <div className="mx-5 lg:mx-24 rounded-lg mt-10  mb-10"> <Link href="/podcasts"> <Image alt="Podcast" className="rounded-lg md:hidden" src={Podcast}/> <Image alt="Podcast" className="rounded-lg  hidden" src={Podcast}/> </Link> </div>
        <RecentPost Home={true} />
        <ArticleCard />

       
      </div>
    </main>
  );
}
