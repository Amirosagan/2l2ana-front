"use client";

import { useEffect, useState } from "react";
import api from "@/src/utils/api";
import VideoLayoutOne from "../VideoHome/VideoLayoutOne";
import { useTranslations } from 'next-intl'; // Import useTranslations for localization

const FeaturedPosts = () => {
  const t = useTranslations('FeaturedPosts'); // Use the 'FeaturedPosts' namespace for translations
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await api.get("/Youtube");
        const allVideos = response.data.items.reverse();
        const featuredVideos = allVideos.filter(item =>
          item.youtubeLink.tags.some(tag => tag.name === "featured")
        );

        let selectedVideos = featuredVideos;
        if (featuredVideos.length < 2) {
          const remainingVideos = allVideos.filter(item =>
            !item.youtubeLink.tags.some(tag => tag.name === "featured")
          );
          selectedVideos = [...featuredVideos, ...remainingVideos.slice(0, 2 - featuredVideos.length)];
        }

        setVideos(selectedVideos.slice(0, 2));
      } catch (error) {
        console.error(t('errorFetching'), error); // Use localized error message
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <section className="w-full mt-16 sm:mt-24  px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col items-center justify-center ">
      <h2 className="tajawal-bold text-primary/90 w-full inline-block font-bold capitalize text-2xl md:text-4xl">
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
          videos.map((video, index) => (
            <article key={index} className="group relative bg-neutral-200 flex flex-col border-[2px] cursor-pointer rounded-lg lg:min-h-[300px] min-h-[220px] overflow-hidden">
              <VideoLayoutOne video={video.youtubeLink} className="w-full h-full" />
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default FeaturedPosts;
