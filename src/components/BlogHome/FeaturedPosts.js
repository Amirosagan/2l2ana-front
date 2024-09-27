"use client";

import { useEffect, useState } from "react";
import BlogLayoutOne from "../Blog/BlogLayoutOne";
import api from "@/src/utils/api";
import { slug } from "github-slugger";
import { useTranslations } from 'next-intl'; 

const FeaturePosts = () => {
  const t = useTranslations('FeaturePosts'); 
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const totalCountResponse = await api.get("/Post?pageSize=1");
        const totalCount = totalCountResponse.data.totalCount || 10;

        const response = await api.get(`/Post?pageSize=${totalCount}`);
        const allBlogs = response.data.items.reverse();
        const featuredBlogs = allBlogs.filter(item =>
          item.tags.some(tag => tag.name === "featured")
        );

        let selectedBlogs = featuredBlogs;
        if (featuredBlogs.length < 2) {
          const remainingBlogs = allBlogs.filter(item =>
            !item.tags.some(tag => tag.name === "featured")
          );
          selectedBlogs = [...featuredBlogs, ...remainingBlogs.slice(0, 2 - featuredBlogs.length)];
        }

        const uniqueBlogs = Array.from(new Set(selectedBlogs.map(b => b.id)))
          .map(id => selectedBlogs.find(b => b.id === id));

        const mappedBlogs = uniqueBlogs.map(item => ({
          id: item.id,
          title: item.title,
          createdAt: item.createdAt,
          imageUrl: item.imageUrl,
          tags: item.tags,
          url: `/blogs/${slug(item.id)}`
        }));

        setBlogs(mappedBlogs.slice(0, 2)); 
        setLoading(false);
      } catch (error) {
        console.error(t('errorFetchingBlogs'), error); // Localized error message
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="w-full mt-16 sm:mt-24 md:mt-32 px-5 sm:px-10 lg:px-24 flex flex-col items-center justify-center ">
      <h2 className="tajawal-bold w-full text-primary/90 inline-block font-bold capitalize text-2xl md:text-4xl">
        {t('mostPopular')} {/* Localized heading */}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 sm:mt-10 w-full h-full">
        {loading ? (
          [...Array(2)].map((_, index) => (
            <div key={index} className="group relative flex flex-col border-[2px] cursor-pointer rounded-lg min-h-[300px] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gray-300 animate-pulse" />
              <div className="absolute inset-0 flex flex-col justify-between p-4 text-white h-full">
                <div className="flex justify-between items-start">
                  <div className="flex flex-wrap">
                    {[...Array(3)].map((_, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-gray-400 rounded-sm mb-1 mr-1 w-16 h-5 animate-pulse" />
                    ))}
                  </div>
                  <span className="capitalize bg-gray-400 rounded-sm h-5 w-24 animate-pulse" />
                </div>
                <div className="mt-auto">
                  <div className="bg-black bg-opacity-50 p-2 rounded">
                    <h2 className="bg-gray-400 w-3/4 h-6 rounded-md animate-pulse mb-2" />
                    <h2 className="bg-gray-400 w-1/2 h-6 rounded-md animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          blogs.map((blog, index) => (
            <BlogLayoutOne blog={blog} key={index} className="w-full h-full" />
          ))
        )}
      </div>
    </section>
  );
};

export default FeaturePosts;
