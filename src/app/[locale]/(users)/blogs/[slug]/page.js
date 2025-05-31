import BlogPageContent from "@/src/components/Blog/BlogSingleContent";
import { slug } from "github-slugger";
import api from "@/src/utils/api";

export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const responseSerilezed = await fetch(
      `https://mettamena.runasp.net/api/Post/${slug}`,
      {
        cache: "no-cache",
      }
    );
    const res = await responseSerilezed.json();
    const blog = res;

    return {
      metadataBase: new URL('https://mettamena.com'),
      title: `${blog.title} | متطمنة`,
      description: blog.content.slice(0, 150) + "...",
      keywords:
        "مدونة طبية, نصائح طبية, استشارات طبية, صحة, صحة عامة, نصائح صحية, حجز طبيب, مدونة طبية عربية, Medical blog, Medical tips, Medical consultations, Health, General health, Health tips, Book a doctor, Arabic medical blog",
      author: "متطمنة",
      openGraph: {
        title: `${blog.title} | متطمنة`,
        description: blog.content.slice(0, 150) + "...",
        type: "article",
        url: `https://mettamena.com/blogs/${slug}`,
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
      title: "Error | متطمنة",
      description: "Error fetching blog data",
    };
  }
}

export async function fetchRelatedPosts(currentBlog) {
  const relatedPostsResponse = await api.get(`/Post`);
  const allPosts = relatedPostsResponse.data.items;

  let relatedPosts = allPosts
    .filter((post) =>
      post.tags.some((tag) => currentBlog.tags.map((t) => t.name).includes(tag.name))
    )
    .filter((post) => post.id !== currentBlog.id) // Exclude the main post
    .map((post) => ({
      id: post.id,
      title: post.title,
      publishedAt: post.createdAt,
      image: {
        filePath: post.imageUrl,
        blurhashDataUrl: '',
        width: 800,
        height: 600,
      },
      tags: post.tags.map((tag) => tag.name),
      url: `/blogs/${slug(post.id)}`,
    }));

  // Fill relatedPosts if there are fewer than 3 posts
  if (relatedPosts.length < 3) {
    const additionalPosts = allPosts
      .filter((post) => post.id !== currentBlog.id && !relatedPosts.some(rp => rp.id === post.id))
      .slice(0, 3 - relatedPosts.length)
      .map((post) => ({
        id: post.id,
        title: post.title,
        publishedAt: post.createdAt,
        image: {
          filePath: post.imageUrl,
          blurhashDataUrl: '',
          width: 800,
          height: 600,
        },
        tags: post.tags.map((tag) => tag.name),
        url: `/blogs/${slug(post.id)}`,
      }));

    relatedPosts = [...relatedPosts, ...additionalPosts];
  }

  return relatedPosts;
}

const BlogPage = async ({ params }) => {
  const { slug } = params;

  try {
    const responseSerilezed = await fetch(
      `https://mettamena.runasp.net/api/Post/${slug}`,
      {
        cache: "no-cache",
      }
    );

    const blog = await responseSerilezed.json();

    if (!blog) {
      return <div>Blog not found</div>;
    }

    const relatedPosts = await fetchRelatedPosts(blog);

    return (
      <div dir="rtl">
        <BlogPageContent 
          blog={blog} 
          relatedPosts={relatedPosts.slice(0, 3)} 
        />
      </div>
    );
  } catch (error) {
    console.error('Error fetching blog:', error);
    return <div>Error loading blog</div>;
  }
};

export default BlogPage;
