"use client";

import { useEffect, useState } from "react";
import api from "@/src/utils/api";
import BlogLayoutThree from "../Blog/BlogLayoutThree";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { slug } from "github-slugger";

const RecentPosts = ({ hideHeader, Home }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const tagId = searchParams.get('tag') || '0';
  const searchText = searchParams.get('search') || '';
  const isFeatured = searchParams.get('featured') === 'true';

  useEffect(() => {
    const fetchBlogs = async () => {
      let pageSize;

      if (hideHeader) {
        pageSize = 0;
      } else if (Home) {
        pageSize = 3;
      } else {
        pageSize = 6;
      }

      try {
        const response = await api.get(`/Post${pageSize ? `?pageSize=${pageSize}` : ''}`);
        let data = response.data.items.map(item => ({
          id: item.id,
          title: item.title,
          publishedAt: item.createdAt,
          image: {
            filePath: item.imageUrl,
            blurhashDataUrl: '',
            width: 800,
            height: 600
          },
          tags: item.tags.map(tag => tag.name),
          url: `/blogs/${slug(item.id)}`
        }));

        if (isFeatured) {
          data = data.filter(blog => blog.tags.some(tag => tag.id === 2) && blog.tags.some(tag => tag.id.toString() === tagId));
        } else if (tagId !== "0") {
          data = data.filter(blog => blog.tags.some(tag => tag.id.toString() === tagId));
        }

        if (searchText) {
          data = data.filter(blog =>
            blog.title.toLowerCase().includes(searchText.toLowerCase())
          );
        }

        const sortedBlogs = data.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

        setBlogs(sortedBlogs);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [tagId, searchText, hideHeader, isFeatured, Home]);

  if (loading) {
    const skeletonCount = Home ? 3 : 6;

    return (
      <section className="w-full mb-5 mt-32 flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-between">
          <h2 style={{ color: "#5cc2c6" }} className="tajawal-bold inline-block font-bold capitalize text-2xl md:text-4xl">
            {hideHeader ? 'المقالات' : 'أحدث المقالات'}
          </h2>
          {!hideHeader && (
            <Link href="/categories/all" className="underline text-lg text-bold text-accent">
              المزيد
            </Link>
          )}
        </div>
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
          {[...Array(skeletonCount)].map((_, index) => (
            <article key={index} className="col-span-1 row-span-1 relative border-[2px] rounded-lg p-3 h-full flex flex-col">
              <div className="relative h-56 w-full rounded-xl overflow-hidden bg-gray-200 animate-pulse">
              
              </div>
              <div className="flex flex-col w-full mt-2 flex-grow">
                <div className="bg-gray-300 h-6 rounded-md animate-pulse w-3/4 mb-2" />
                <div className="bg-gray-300 h-4 rounded-md animate-pulse w-1/2 mb-2" />
                <div className="bg-gray-300 h-4 rounded-md animate-pulse w-1/4 mb-2" />
                <div className="mt-auto flex justify-between items-center">
                  <div className="bg-gray-300 h-4 rounded-md animate-pulse w-1/3" />
                  <div className="bg-gray-300 h-4 rounded-md animate-pulse w-1/6" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return hideHeader ? (
    <section className="w-full mb-5 px-5 sm:px-10 md:px-24 sxl:px-32 flex mt-16 flex-col items-center justify-center">
      <div className="w-full items-center flex justify-between">
        <h2 style={{ color: "#5cc2c6" }} className="tajawal-bold w-fit inline-block font-bold capitalize text-2xl md:text-4xl">
          المقالات
        </h2>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {blogs.map((blog, index) => (
          <article key={index} className="col-span-1 row-span-1 relative">
            <BlogLayoutThree blog={blog} />
          </article>
        ))}
      </div>
    </section>
  ) : (
    <section className="w-full mb-5 sm:mt-24 md:mt-32 px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col items-center justify-center">
      <div className="w-full flex justify-between">
        <h2 style={{ color: "#5cc2c6" }} className="tajawal-bold w-fit inline-block font-bold capitalize text-2xl md:text-4xl">
          أحدث المقالات
        </h2>
        <Link href="/categories?type=posts" className="underline text-lg text-bold text-accent">
          المزيد
        </Link>
      </div>
      <div className="lg:mt-16 mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
        {blogs.map((blog, index) => (
          <article key={index} className="col-span-1 row-span-1 relative">
            <BlogLayoutThree blog={blog} />
          </article>
        ))}
      </div>
    </section>
  );
};

export default RecentPosts;
