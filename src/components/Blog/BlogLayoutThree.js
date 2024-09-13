import React from "react";
import Image from "next/image";
import { Link } from '@/src/i18n/routing';
import { formatDate } from "@/src/utils/formatDate";

const BlogLayoutThree = ({ blog }) => {
  // Ensure that `blog` is defined before proceeding
  if (!blog) {
    return null; // or return some fallback UI
  }

  // Safely format the date, with a fallback if `publishedAt` is missing
  const formattedDate = blog.publishedAt ? formatDate(blog.publishedAt) : "Date not available";

  return (
    <Link
      href={blog.url || '#'}
      className="group flex flex-col border-[2px] cursor-pointer hover:border-primary transition-all ease-in-out bg-white hover:shadow-sm rounded-lg p-3 h-full"
    >
      <div className="relative h-32 md:h-56 w-full rounded-xl overflow-hidden">
        {blog.image?.filePath ? (
          <Image
            src={blog.image.filePath}
            alt={blog.title || 'No title'}
            width={700}
            height={540}
            className="h-full object-cover object-center group-hover:scale-105 transition-all ease duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized={true}
            priority={true}  
          />
        ) : (
          <div className="w-full h-full flex justify-center items-center bg-gray-200">
            No Image Available
          </div>
        )}
      </div>
      <div className="flex flex-col w-full mt-2 flex-grow">
        <h2 className="font-semibold capitalize text-base sm:text-lg line-clamp-2">
          <span className="bg-gradient-to-r from-primary/50 to-primary/50 text-black bg-[length:0px_6px] group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
            {blog.title || 'Untitled'}
          </span>
        </h2>
        <div className="flex flex-col justify-end mt-2 flex-grow">
          <div className="flex flex-row justify-between items-center mt-2">
            <span className="capitalize text-gray-500 font-semibold text-sm sm:text-base">
              {formattedDate}
            </span>
            <div className="flex">
              {blog.tags?.map((tag, index) => (
                <span key={index} className="text-primary text-sm tajawal-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogLayoutThree;
