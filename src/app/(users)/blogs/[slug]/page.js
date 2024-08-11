import BlogPageClient from "./client";

export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const responseSerilezed = await fetch(
      `https://api.2l2ana.com/api/Post/${slug}`,
      {
        cache: "no-cache",
      },
    );
    const res = await responseSerilezed.json();
    const blog = res;
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
    return {
      title: "Error | قلقانة",
      description: "Error fetching blog data",
    };
  }
}

const BlogPage = async ({ params }) => {
  const { slug } = params;
  const responseSerilezed = await fetch(
    `https://api.2l2ana.com/api/Post/${slug}`,
    {
      cache: "no-cache",
    },
  );

  const response = await responseSerilezed.json();
  const blog = response;

  if (!blog) {
    return <div>Blog not found</div>;
  }
  return (
    <div>
      <BlogPageClient initialBlog={blog} />
    </div>
  );

};

export default BlogPage;
