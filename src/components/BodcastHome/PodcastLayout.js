import React from "react";
import { format, isValid } from "date-fns";
import { Link } from '@/src/i18n/routing';

const PodcastLayout = ({ podcast }) => {
  if (!podcast) return <div>No podcast available</div>;

  const date = new Date(podcast.createdAt);
  const formattedDate = isValid(date) ? format(date, "MMMM dd, yyyy") : "Invalid date";

  const nonFeaturedTags = podcast.tags.filter(tag => tag.name !== "featured");

  return (
    <Link
      href={{
        pathname: '/podcasts',
        query: { podcast: podcast.title || '' }
      }}
      shallow
      className="group flex flex-col items-center border-[2px] cursor-pointer hover:border-primary transition-all ease-in-out hover:shadow-sm rounded-lg p-3"
    >
      <div className="relative h-40 w-full rounded-xl overflow-hidden">
        {podcast.audioUrl ? (
          <div className="pointer-events-none">
            <iframe
              src={`https://open.spotify.com/embed/episode/${new URL(podcast.audioUrl).pathname.split("/").pop()}`}
              width="100%"
              height="200px"

              allow="encrypted-media"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center bg-gray-200">
            No URL provided
          </div>
        )}
      </div>
      <div className="flex flex-col w-full mt-2 flex-grow">
        <h2 className="font-semibold capitalize tajawal-bold text-base sm:text-lg line-clamp-2">
          <span className="bg-gradient-to-r from-primary/50 to-primary/50 bg-[length:0px_6px] group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
            {podcast.title}
          </span>
        </h2>
        <div className="flex flex-col justify-end flex-grow">
          <div className="flex flex-row justify-between items-center mt-1 md:mt-2">
            <span className="capitalize text-gray font-semibold text-sm sm:text-base">
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

export default PodcastLayout;
