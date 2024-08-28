"use client";
import { useEffect, useState } from "react";
import api from "@/src/utils/api";
import { checkSession } from "@/src/utils/auth";
import BlogPageContent from "@/src/components/Blog/BlogSingleContent";

const BlogPageClient = ({ initialBlog }) => {
  const [blog, setBlog] = useState(initialBlog);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const verifySession = async () => {
      const sessionData = await checkSession();
      setIsLoggedIn(!!sessionData);
    };

    verifySession();
  }, []);

  useEffect(() => {
    if (blog) {
      const fetchRelatedPosts = async () => {
        try {
          const response = await api.get(`/Post`);
          const allPosts = response.data.items;

          // Filter posts by matching tags
          let matchingPosts = allPosts.filter(
            (post) =>
              post.id !== blog.id && // Exclude the initial blog from the related posts
              post.tags.some((tag) => blog.tags.map((t) => t.name).includes(tag.name))
          );

          // If no matching tags, get any other posts (excluding the initial blog)
          if (matchingPosts.length === 0) {
            matchingPosts = allPosts.filter((post) => post.id !== blog.id);
          }

          // Map the data to ensure consistency with RecentPosts
          const relatedData = matchingPosts.map((item) => ({
            id: item.id,
            title: item.title.trim(), // Trim the title to remove excess spaces
            publishedAt: item.createdAt,
            image: {
              filePath: item.imageUrl || "", // Provide fallback for missing imageUrl
              blurhashDataUrl: "",
              width: 800,
              height: 600,
            },
            tags: item.tags ? item.tags.map((tag) => tag.name) : [], // Ensure tags are mapped or provide an empty array
            url: `/blogs/${item.id}`, // Use the item id directly for URL
          }));

          setRelatedPosts(relatedData.slice(0, 3));
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching related posts:", error);
          setIsLoading(false);
        }
      };

      fetchRelatedPosts();
    }
  }, [blog]);

  if (isLoading) {
    return (
      <div className="flex justify-center bg-neutral-300 items-center tajawal-bold text-5xl">
        <div className="w-[70%] h-[500px] bg-neutral-300 flex justify-center items-center"></div>
      </div>
    );
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return <BlogPageContent blog={blog} relatedPosts={relatedPosts} isLoggedIn={isLoggedIn} />;
};

export default BlogPageClient;
