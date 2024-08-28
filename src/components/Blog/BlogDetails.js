import React from "react";
import { formatDate } from "@/src/utils/formatDate"; 

const BlogDetails = ({ blog }) => {
  const formattedDate = formatDate(blog.createdAt); 

  return (
    <div className="px-2 md:px-10 mb-3 bg-accent text-light py-2 flex items-center justify-around flex-wrap text-lg sm:text-xl font-medium mx-5 md:mx-10 rounded-lg">
      <time className="md:m-3 text-sm md:text-base">
        {formattedDate}
      </time>
    </div>
  );
};

export default BlogDetails;
