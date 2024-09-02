"use client";

import React from "react";
import VideoLayoutThree from "@/src/components/VideoHome/VideoLayoutThree";

const CategoryVideos = ({ videos, hideHeader }) => {
  if (videos.length === 0) {
    return (
      <section className="w-full mb-5 px-5 lg:px-24 flex flex-col items-center justify-center">
        <p>No videos available.</p>
      </section>
    );
  }

  return (
    <section className={`w-full mb-5 ${hideHeader ? 'mt-16' : 'lg:mt-20'} px-5 lg:px-24 flex flex-col items-center justify-center`}>
      {!hideHeader && (
        <div className="w-full items-center flex justify-between">
          <h2 className="tajawal-bold w-fit text-primary/90 inline-block font-bold capitalize text-2xl md:text-4xl">
            الفيديوهات
          </h2>
        </div>
      )}
      <div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-10">
        {videos.map((video, index) => (
          <VideoLayoutThree key={index} video={video.youtubeLink} />
        ))}
      </div>
    </section>
  );
};

export default CategoryVideos;
