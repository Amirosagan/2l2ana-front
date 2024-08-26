import CoverSection from "@/src/components/BlogHome/CoverSection";
import RecentPosts from "@/src/components/BlogHome/RecentPosts";
import FeaturedPosts from "@/src/components/BlogHome/FeaturedPosts";
import DoctoorBoster from "@/src/components/AboutUs/DoctoorBoster";
import api from "@/src/utils/api";

export async function generateMetadata() {
  const res = await api.get("/Post");
  const data = res.data;

  const titles = data.items.map((blog) => blog.title).join(", ");

  return {
    metadataBase: new URL('https://2l2ana.com'),
    title: `مقالات طبية | قلقانة`,
    description: `اكتشف مقالاتنا الجديدة واستفد من المعلومات الغنية. تشمل المواضيع: ${titles}.`,
    keywords:
      "حجز دكتور, مقالات طبية, استشارة طبية, نصائح طبية, استفسارات صحية, دكتور اونلاين, دكتور عبر الإنترنت, حجز استشارة طبية, مقال طبي, طبيب استشاري, نصيحة طبية, استفسار طبي, حجز موعد مع دكتور, استشارة دكتور, نصائح صحية, طبيب متخصص, استفسارات طبية شائعة, book doctor, medical articles, doctor consultation, medical advice, health queries, online doctor, doctor appointment, medical consultation, medical articles, professional medical advice",
    author: "قلقانة",
    openGraph: {
      title: `مدونة | قلقانة`,
      description: `اكتشف مقالاتنا الجديدة واستفد من المعلومات الغنية. تشمل المواضيع: ${titles}.`,
      type: "website",
      url: `https://2l2ana.com/blog`,
      images: [
        {
          url: "https://2l2ana.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fblog-image.abc123.png&w=1080&q=75",
          width: 800,
          height: 600,
          alt: "مدونة طبية",
        },
      ],
    },
  };
}

const BlogPage = async () => {
  const res = await api.get("/Post");
  const blogs = res.data.items;

  return (
    <div className="md:mt-6">
      <div className="flex flex-col items-center lg:w-[83%] m-auto justify-center">
        <CoverSection />
        <FeaturedPosts />
        <div className=" w-[85%] mb-10 lg:mb-0 m-auto">
          <DoctoorBoster />
        </div>
        <RecentPosts />
      </div>
    </div>
  );
};

export default BlogPage;
