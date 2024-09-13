import React from "react";
import Image from "next/image";
import { Link } from '@/src/i18n/routing';
import Tag from "@/src/components/ELements/Tag";
import { formatDate } from "@/src/utils/formatDate"; 

const BlogLayoutOne = ({ blog }) => {
  const formattedDate = formatDate(blog.createdAt);
  const blogUrl = blog.url || "/";

  return (
    <Link href={blogUrl} legacyBehavior>
      <a className="group relative flex flex-col border-[2px]  cursor-pointer  max-h-[220px] lg:max-h-[300px] hover:border-primary transition-all ease-in-out hover:shadow-sm rounded-lg lg:min-h-[300px] min-h-[220px] overflow-hidden">
        <div className="relative top-0 left-0  lg:min-h-[300px] min-h-[220px] max-h-[220px]  lg:max-h-[300px]   overflow-hidden">
          {blog.imageUrl ? (
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              width={200}
              height={200}
              className="absolute top-0 left-0 w-full h-full object-cover object-center group-hover:scale-105 transition-all ease duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized={true}
            />
          ) : (
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-200">
              No Image Available
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent opacity-70" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-between p-4 text-white h-full">
          <div className="flex justify-between items-start">
            <div className="flex flex-wrap">
              {blog.tags &&
                blog.tags.length > 0 &&
                blog.tags.map((tag) => (
                  <Tag
                    key={tag.id}
                    link={`/categories/${tag.name}`}
                    name={tag.name}
                    className="px-2 py-1 text-xs w-fit sm:text-sm border border-white mr-1 mb-1"
                  />
                ))}
            </div>
            <span className="capitalize text-gray-200 font-semibold text-sm">
              {formattedDate}
            </span>
          </div>
          <div className="mt-auto">
            <div className="bg-black bg-opacity-50 p-2 rounded">
              <h2 className="tajawal-bold capitalize text-sm xs:text-base sm:text-xl md:text-2xl">
                <span className="bg-gradient-to-r from-primary to-primary bg-[length:0px_6px] group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
                  {blog.title}
                </span>
              </h2>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default BlogLayoutOne;
