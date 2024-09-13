import React from "react";
import { Link } from '@/src/i18n/routing';
import Tag from "@/src/components/ELements/Tag";
import YouTubePlayer from "./YouTubePlayer";
import { formatDate } from "@/src/utils/formatDate"; 

const VideoLayoutOne = ({ video }) => {
  if (!video.url) {
    return <div>Invalid video data</div>;
  }

  const nonFeaturedTags = video.tags.filter((tag) => tag.name !== "featured");
  const formattedDate = formatDate(video.lastUpdate); 

  return (
    <Link href={`/videos/${video.id}`} legacyBehavior>
      <a className="group relative flex flex-col border-[2px] cursor-pointer hover:border-primary transition-all ease-in-out hover:shadow-sm rounded-lg min-h-[220px] lg:min-h-[300px] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <YouTubePlayer videoUrl={video.url} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/60 opacity-80 backdrop-blur-md" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-between p-4 text-white h-full">
          <div className="flex justify-between items-start">
            <div className="flex flex-wrap">
              {nonFeaturedTags.length > 0 &&
                nonFeaturedTags.map((tag) => (
                  <Tag
                    key={tag.id}
                    link={`/categories/${tag.name}`}
                    name={tag.name}
                    className="px-2 py-1 text-xs w-fit sm:text-sm border border-white mr-1 mb-1"
                  />
                ))}
            </div>
            <span className="capitalize text-white font-semibold text-sm">
              {formattedDate}
            </span>
          </div>
          <div className="mt-auto">
            <div className="bg-gray-500 p-2 rounded">
              <h2 className="tajawal-bold capitalize text-sm xs:text-base sm:text-xl md:text-2xl">
                <span className="bg-gradient-to-r from-primary to-primary bg-[length:0px_6px] group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
                  {video.title}
                </span>
              </h2>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default VideoLayoutOne;
