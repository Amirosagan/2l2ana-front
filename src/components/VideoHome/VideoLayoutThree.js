import React from "react";
import { format, isValid } from "date-fns";
import Link from "next/link";
import YouTube from "react-youtube";

const VideoLayoutThree = ({ video }) => {
  if (!video) return <div>No video available</div>;

  let videoId;
  try {
    videoId = new URLSearchParams(new URL(video.url).search).get("v");
  } catch (error) {
    console.error("Invalid URL:", video.url);
    videoId = null;
  }

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  const date = new Date(video.lastUpdate);
  const formattedDate = isValid(date) ? format(date, "MMMM dd, yyyy") : "Invalid date";

  const nonFeaturedTags = video.tags.filter(tag => tag.name !== "featured");

  return (
    <Link href={`/videos/${video.id}`} className="group bg-white flex flex-col lg:min-w-[300px] items-center border-[2px] cursor-pointer hover:border-primary transition-all ease-in-out hover:shadow-sm rounded-lg p-3 lg:min-h-[300px]">
      <div className="relative h-40 md:h-56 w-full rounded-xl overflow-hidden ">
        {video.url && videoId ? (
          <>
            <YouTube videoId={videoId} opts={opts} className="absolute top-0 left-0 h-full w-full" />
            <div className="absolute top-0 left-0 h-full w-full bg-transparent z-10"></div>
          </>
        ) : (
          <div className="w-full h-full flex justify-center items-center bg-gray-200">
            No URL provided
          </div>
        )}
      </div>
      <div className="flex flex-col w-full mt-2 flex-grow">
        <h2 className="font-semibold capitalize tajawal-bold text-base sm:text-lg line-clamp-2">
          <span className="bg-gradient-to-r from-primary/50 to-primary/50 bg-[length:0px_6px] group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
            {video.title}
          </span>
        </h2>
        <div className="flex flex-col justify-end flex-grow">
          <div className="flex flex-row justify-between items-center mt-1 md:mt-2">
            <span className="capitalize text-gray  font-semibold text-sm sm:text-base">
              {formattedDate}
            </span>
            <div className="flex">
              {nonFeaturedTags.map(tag => (
                <span key={tag.id} className="text-primary text-sm tajawal-medium">
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoLayoutThree;
