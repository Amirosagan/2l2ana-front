import React from "react";
import VideoLayoutThree from "./VideoLayoutThree";
import { Link } from '@/src/i18n/routing';

const RecentPost = ({ videos, hideHeader, Home }) => {
  if (!videos || videos.length === 0) {
    return (
      <section className="w-full mb-5 px-5 lg:px-24 flex flex-col items-center justify-center">
        <p>No videos available.</p>
      </section>
    );
  }

  return hideHeader ? (
    <section className="w-full mb-5 px-5 sm:px-10 md:px-24 flex mt-16 flex-col items-center justify-center">
      <div className="w-full items-center flex justify-between">
        <h2 className="tajawal-bold w-fit text-primary/90 inline-block font-bold capitalize text-2xl md:text-4xl">
          الفيديوهات:
        </h2>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5 xl:gap-80">
        {videos.map((video, index) => (
          <VideoLayoutThree key={index} video={video.youtubeLink} />
        ))}
      </div>
    </section>
  ) : (
    <section className="w-full mb-5 lg:mt-20 px-5 lg:px-24 flex flex-col items-center justify-center">
      <div className="w-full items-center flex justify-between">
        <h2 className={`tajawal-bold w-fit text-primary/90 inline-block font-bold capitalize text-2xl ${Home ? 'md:text-3xl' : 'md:text-4xl'}`}>
          أحدث الفيديوهات
        </h2>
        <Link className="underline text-lg text-accent" href={Home ? "/videos" : "/categories"}>
          المزيد
        </Link>
      </div>
      <div className={`mt-6 ${Home ? 'lg:mt-4' : 'lg:mt-8'} w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-10`}>
        {videos.map((video, index) => (
          <VideoLayoutThree key={index} video={video.youtubeLink} />
        ))}
      </div>
    </section>
  );
};

export default RecentPost;
