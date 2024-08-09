import BlogPageClient from "./client";
import api from "@/src/utils/api";

export async function generateStaticParams() {
  const res = await api.get("/Post");
  const data = res.data.items;

  return data.map((blog) => ({
    slug: blog.id,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const res = await api.get(`/Post/${slug}`);
    const blog = res.data;

    return {
      title: `${blog.title} | قلقانة`,
      description: blog.content.slice(0, 150) + "...",
      keywords:
        "مدونة طبية, نصائح طبية, استشارات طبية, صحة, صحة عامة, نصائح صحية, حجز طبيب, مدونة طبية عربية, Medical blog, Medical tips, Medical consultations, Health, General health, Health tips, Book a doctor, Arabic medical blog",
      author: "قلقانة",
      openGraph: {
        title: `${blog.title} | قلقانة`,
        description: blog.content.slice(0, 150) + "...",
        type: "article",
        url: `https://2l2ana.com/blogs/${slug}`,
        images: [
          {
            url: blog.imageUrl,
            width: 800,
            height: 600,
            alt: blog.title,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error fetching blog metadata:", error);
    return {
      title: "Error | قلقانة",
      description: "Error fetching blog data",
    };
  }
}

const BlogPage = async ({ params }) => {
  const { slug } = params;

  try {
    const response = await api.get(`/Post/${slug}`);
    const blog = response.data;

    return (
      <div>
        <BlogPageClient initialBlog={blog} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return <div>Error fetching blog data</div>;
  }
};

export default BlogPage;
