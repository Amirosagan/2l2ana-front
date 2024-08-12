"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Tag from "@/src/components/ELements/Tag";
import api from "@/src/utils/api";

const CoverSection = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLastBlog = async () => {
      try {
        let page = 1;
        let lastBlog = null;
        let totalPages = 1;

        while (page <= totalPages) {
          const response = await api.get(`/Post?page=${page}&pageSize=10`);
          const { items, totalPages: responseTotalPages } = response.data;
          totalPages = responseTotalPages;

          if (items.length > 0) {
            lastBlog = items[items.length - 1];
          }

          page++;
        }

        setBlog(lastBlog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLastBlog();
  }, []);

  if (loading) {
    return (
      <div className="w-full md:inline-block">
        <h1
          className="text-3xl mx-4 mb-5 md:hidden"
          style={{ color: "rgb(92, 194, 198)" }}
        >
          {" "}
          المقالات{" "}
        </h1>
        <article className="flex flex-col items-start justify-end mx-5 lg:w-[90%] lg:m-auto relative h-[40vh] md:h-[80vh]">
          <div className="absolute top-0 left-0 bottom-0 right-0 h-full w-full bg-gradient-to-b from-transparent to-dark/90 rounded-3xl z-10" />
          <div className="relative w-full h-full rounded-3xl z-0 overflow-hidden">
            <div className="absolute inset-0 w-full h-full bg-gray-300 flex items-center justify-center animate-pulse">
              <span className="text-xl"></span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 p-16 z-20 text-light flex flex-col items-start justify-center w-full space-y-4">
            <div className="bg-gray-400 rounded-md w-1/4 h-6 animate-pulse" />
            <div className="bg-gray-500 rounded-md w-3/4 h-10 animate-pulse" />
            <div className="bg-gray-400 rounded-md w-1/2 h-6 animate-pulse" />
          </div>
        </article>
      </div>
    );
  }

  if (!blog) {
    return <div>Error loading blog</div>;
  }

  return (
    <div className="w-full">
      <h1
        className="text-3xl mx-4 mb-5 mt-2 md:hidden"
        style={{ color: "rgb(92, 194, 198)" }}
      >
        {" "}
        المقالات{" "}
      </h1>
      <article className="flex flex-col items-start mx-5 lg:w-[90%] lg:m-auto justify-end relative md:h-[80vh]">
        <div className="absolute right-0 top-0 left-0 bottom-0 bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-3xl z-0"></div>
        {blog.imageUrl ? (
          <Image
            className="w-full h-full object-center object-cover rounded-3xl -z-10 border-4"
            alt={blog.title}
            src={blog.imageUrl}
            layout="fill"
            unoptimized={true}

          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-3xl -z-10 border-4 flex items-center justify-center">
            <span>No Image Available</span>
          </div>
        )}
        <div className="w-3/4 p-16 flex flex-col items-start justify-center z-0 cursor-pointer text-light">
          <Tag name={blog.tags[0]?.name || "Uncategorized"} link="" />
          <Link href={`/blogs/${blog.id}`} className="mt-6">
            <h1 className="font-bold capitalize text-4xl">
              <span className="bg-gradient-to-r from-primary to-primary bg-[length:0px_5px] hover:bg-[length:100%_5px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
                {blog.title}
              </span>
            </h1>
          </Link>
          <p className="inline-block mt-4 text-xl font-in">
            {blog.description}
          </p>
        </div>
      </article>
    </div>
  );
};

export default CoverSection;
