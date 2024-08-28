import BlogPageContent from "@/src/components/Blog/BlogSingleContent";

const BlogPageClient = ({ initialBlog, initialRelatedPosts, initialIsLoggedIn }) => {
  if (!initialBlog) {
    return <div>Blog not found</div>;
  }

  return (
    <BlogPageContent 
      blog={initialBlog} 
      relatedPosts={initialRelatedPosts || []} 
      isLoggedIn={initialIsLoggedIn} 
    />
  );
};

export default BlogPageClient;
