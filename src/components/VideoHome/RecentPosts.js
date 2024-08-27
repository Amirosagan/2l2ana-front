"use client";

import { useEffect, useState } from "react";
import api from "@/src/utils/api";
import VideoLayoutThree from "./VideoLayoutThree";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const RecentPost = ({ hideHeader, Home }) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const tagId = searchParams.get('tag') || '0';
    const searchText = searchParams.get('search') || '';
    const isFeatured = searchParams.get('featured') === 'true';

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await api.get("/Youtube");
                let filteredVideos = response.data.items;

                if (isFeatured) {
                    filteredVideos = filteredVideos.filter(video =>
                        video.youtubeLink.tags.some(tag => tag.id === 2) &&
                        (tagId === '0' || video.youtubeLink.tags.some(tag => tag.id.toString() === tagId))
                    );
                } else if (tagId !== "0") {
                    filteredVideos = filteredVideos.filter(video =>
                        video.youtubeLink.tags.some(tag => tag.id.toString() === tagId)
                    );
                }

                if (searchText) {
                    filteredVideos = filteredVideos.filter(video =>
                        video.youtubeLink.title.toLowerCase().includes(searchText.toLowerCase())
                    );
                }

                // Apply different video set logic based on hideHeader and Home
                if (hideHeader) {
                    setVideos(filteredVideos); // Fetch all videos
                } else if (Home) {
                    setVideos(filteredVideos.slice(0, 3)); // Fetch the first 3 videos for home
                } else {
                    setVideos(filteredVideos.slice(0, 6)); // Fetch the first 6 videos
                }

                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [tagId, searchText, hideHeader, isFeatured, Home]);

    if (loading) {
        const skeletonCount = Home ? 3 : 6;

        return (
            <section className="w-full mb-5 px-5 lg:px-24 flex flex-col items-center justify-center">
                {!hideHeader && (
                    <div className="w-full flex items-center justify-between">
                        <h2 className="tajawal-bold w-fit text-primary/90 inline-block font-bold capitalize text-2xl md:text-4xl">
                            أحدث الفيديوهات
                        </h2>
                        <Link className="underline text-lg text-accent" href={Home ? "/videos" : "/categories"}>
                            المزيد
                        </Link>
                    </div>
                )}
                <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
                    {[...Array(skeletonCount)].map((_, index) => (
                        <article key={index} className="col-span-1 row-span-1 relative border-[2px] rounded-lg p-3 h-full flex flex-col">
                            <div className="relative h-56 w-full rounded-xl overflow-hidden bg-gray-200 animate-pulse"></div>
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
            <div className= {`mt-6 ${Home ? 'lg:mt-4' : 'lg:mt-8'}  w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-10`}>
                {videos.map((video, index) => (
                    <VideoLayoutThree key={index} video={video.youtubeLink} />
                ))}
            </div>
        </section>
    );
};

export default RecentPost;
