'use client';

import { useEffect, useState } from "react";
import api from "@/src/utils/api";
import { useSearchParams } from "next/navigation";
import PodcastLayout from "./PodcastLayout";

const RecentPodcast = () => {
    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const tagId = searchParams.get('tag') || '0';
    const searchText = searchParams.get('search') || '';
    const isFeatured = searchParams.get('featured') === 'true';

    useEffect(() => {
        const fetchPodcasts = async () => {
            try {
                const response = await api.get("/Podcast");
                let filteredPodcasts = response.data.podcasts;

                if (isFeatured) {
                    filteredPodcasts = filteredPodcasts.filter(podcast =>
                        podcast.tags.some(tag => tag.id === 2) &&
                        (tagId === '0' || podcast.tags.some(tag => tag.id.toString() === tagId))
                    );
                } else if (tagId !== "0") {
                    filteredPodcasts = filteredPodcasts.filter(podcast =>
                        podcast.tags.some(tag => tag.id.toString() === tagId)
                    );
                }

                if (searchText) {
                    filteredPodcasts = filteredPodcasts.filter(podcast =>
                        podcast.title.toLowerCase().includes(searchText.toLowerCase())
                    );
                }

                setPodcasts(filteredPodcasts.reverse());
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchPodcasts();
    }, [tagId, searchText, isFeatured]);

    if (loading) {
        return (
            <section className="w-full mb-5 px-5 sm:px-10 md:px-24 flex flex-col items-center justify-center">
                <div className="w-full flex items-center justify-between">
                    <h2 className="tajawal-bold w-fit text-primary/90 inline-block mt-20 font-bold capitalize text-xl md:text-2xl">
                    شاهد أيضاً: 
                    </h2>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
                    {[...Array(6)].map((_, index) => (
                        <article key={index} className="col-span-1 row-span-1 relative border-[2px] rounded-lg p-3 h-full flex flex-col">
                            <div className="relative h-40 w-full rounded-xl overflow-hidden bg-gray-200 animate-pulse"></div>
                            <div className="flex flex-col w-full mt-2 flex-grow">
                                <div className="bg-gray-300 h-6 rounded-md animate-pulse w-3/4 mb-2" />
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

    return (
        <section className="w-full mb-5 lg:mt-20 px-5 sm:px-10 lg:px-24 flex flex-col items-center justify-center">
            <div className="w-full items-center flex justify-between">
                <h2 className="tajawal-bold w-fit text-primary/90 inline-block font-bold capitalize text-xl md:text-2xl">
                شاهد أيضاً:
                </h2>
            </div>
            <div className="mt-4 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-10">
                {podcasts.map((podcast, index) => (
                    <PodcastLayout key={index} podcast={podcast} />
                ))}
            </div>
        </section>
    );
};

export default RecentPodcast;
