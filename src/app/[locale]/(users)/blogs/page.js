import CoverSection from "@/src/components/BlogHome/CoverSection";
import RecentPosts from "@/src/components/BlogHome/RecentPosts";
import FeaturedPosts from "@/src/components/BlogHome/FeaturedPosts";
import DoctoorBoster from "@/src/components/AboutUs/DoctoorBoster";
import { slug } from "github-slugger";

export async function fetchBlogs() {
  const response = await fetch('https://mettamena.runasp.net/api/Post?pageSize=15', {
    cache: 'no-cache',  // Ensure the request bypasses the cache
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
}

export async function generateMetadata() {
  const blogs = await fetchBlogs(); 
  const titles = blogs.map((blog) => blog.title).join(", ");

  return {
    metadataBase: new URL('https://mettamena.com'),
    title: `مقالات طبية | متطمنة`,
    description: `اكتشف مقالاتنا الجديدة واستفد من المعلومات الغنية. تشمل المواضيع: ${titles}.`,
    keywords:
      "حجز دكتور, مقالات طبية, استشارة طبية, نصائح طبية, استفسارات صحية, دكتور اونلاين, دكتور عبر الإنترنت, حجز استشارة طبية, مقال طبي, طبيب استشاري, نصيحة طبية, استفسار طبي, حجز موعد مع دكتور, استشارة دكتور, نصائح صحية, طبيب متخصص, استفسارات طبية شائعة, book doctor, medical articles, doctor consultation, medical advice, health queries, online doctor, doctor appointment, medical consultation, medical articles, professional medical advice",
    author: "متطمنة",
    openGraph: {
      title: `مدونة | متطمنة`,
      description: `اكتشف مقالاتنا الجديدة واستفد من المعلومات الغنية. تشمل المواضيع: ${titles}.`,
      type: "website",
      url: `https://mettamena.com/blog`,
      images: [
        {
          url: "https://mettamena.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fblog-image.abc123.png&w=1080&q=75",
          width: 800,
          height: 600,
          alt: "مدونة طبية",
        },
      ],
    },
  };
}

const BlogPage = async () => {
  const blogs = await fetchBlogs();

  return (
    <div className="md:mt-6" >
      <div className="flex flex-col items-center lg:w-[83%] m-auto justify-center">
        <CoverSection blog={blogs[0]} />
        <FeaturedPosts />
        <div className="w-[85%] mb-10 lg:mb-0 m-auto">
          <DoctoorBoster />
        </div>
        <RecentPosts blogs={blogs} />
      </div>
    </div>
  );
};

export default BlogPage;
