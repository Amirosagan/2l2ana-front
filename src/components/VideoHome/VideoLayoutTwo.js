import React from "react";
import { format } from "date-fns";
import Link from "next/link";
import YouTube from "react-youtube";

const VideoLayoutTwo = ({ video }) => {
    let videoId;
    try {
        videoId = new URLSearchParams(new URL(video.url).search).get("v");
    } catch (error) {
        console.error("Invalid URL:", video.url);
        videoId = null;
    }

    if (!video.url) {
        return <div>Invalid video data</div>;
    }

    return (
        <div className="group grid grid-cols-12 gap-4 items-center text-dark dark:text-light">
            <Link href={video.url} legacyBehavior>
                <a className="col-span-12 lg:col-span-4 h-full rounded-xl overflow-hidden w-full">
                    <div className="relative w-full h-0 pb-[52.25%]">
                        {videoId ? (
                            <YouTube
                                videoId={videoId}
                                className="absolute top-0 left-0 w-full h-full"
                                opts={{
                                    width: "100%",
                                    height: "100%",
                                    playerVars: {
                                        autoplay: 0,
                                    },
                                }}
                            />
                        ) : (
                            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-200">
                                Invalid Video URL
                            </div>
                        )}
                    </div>
                </a>
            </Link>
            <div className="col-span-12 lg:col-span-8 w-full">
                {video.tags && video.tags.length > 0 && (
                    <span className="inline-block w-full uppercase text-accent dark:text-accentDark font-semibold text-xs sm:text-sm">
                        {video.tags[0].name}
                    </span>
                )}
                <div  className="flex flex-col"> 
                <Link href={video.url} legacyBehavior>
                    <a className="inline-block my-1">
                        <h2 className="font-semibold capitalize text-base sm:text-lg">
                            <span className="bg-gradient-to-r from-accent/50 dark:from-accentDark/50 to-accent/50 dark:to-accentDark/50 bg-[length:0px_6px] group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
                                {video.title}
                            </span>
                        </h2>
                    </a>
                </Link>
                <span className="text-sm">{format(new Date(video.lastUpdate), "MMMM dd, yyyy")}</span>
            </div>
            </div>
        </div>
    );
};

export default VideoLayoutTwo;
