'use client';

import { useEffect, useState } from 'react';
import api from '@/src/utils/api';
import { useSearchParams } from 'next/navigation';

const CoverSection = () => {
    const [podcast, setPodcast] = useState(null);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const podcastTitle = searchParams.get('podcast') || '';

    useEffect(() => {
        const fetchPodcast = async () => {
            try {
                const response = await api.get('/Podcast');
                const podcasts = response.data.podcasts;

                let selectedPodcast = podcasts.find(p => p.title.toLowerCase() === podcastTitle.toLowerCase());

                if (!selectedPodcast) {
                    selectedPodcast = podcasts.length > 0 ? podcasts[podcasts.length - 1] : null;
                }

                setPodcast(selectedPodcast);
            } catch (error) {
                console.error('Error fetching podcast:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPodcast();
    }, [podcastTitle]);

    if (loading) {
        return (
            <div className="w-full  md:inline-block">
                <h1 className='text-3xl md:hidden mx-4 mb-5 text-primary/90'>بودكاست</h1>
                <article className="flex flex-col items-start justify-end mx-5 lg:w-[90%] lg:m-auto relative h-[352px]">
                    <div className="absolute top-0 left-0 bottom-0 right-0 h-full w-full bg-gradient-to-b from-transparent to-dark/90 rounded-3xl z-10" />
                    <div className="relative w-full h-full rounded-3xl z-0 overflow-hidden">
                        <div className="absolute inset-0 w-full h-full bg-gray-300 flex items-center justify-center animate-pulse">
                            <span className="text-xl"></span>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 p-16 z-20 text-light flex flex-col items-start justify-center w-full space-y-4">
                        <div className="bg-gray-400 rounded-md w-1/4 h-6 animate-pulse" />
                        <div className="bg-gray-500 rounded-md w-3/4 h-10 animate-pulse" />
                        <div className="bg-gray-400 rounded-md w-1/2 h-6 animate-pulse" />
                    </div>
                </article>
            </div>
        );
    }

    if (!podcast) {
        return <div>Error loading podcast</div>;
    }

    const spotifyUrl = podcast.audioUrl;

    return (
        <div className="w-full md:mt-5 lg:mt-0 md:inline-block">
            <h1 className='text-3xl mx-4 mb-5 md:hidden text-primary/90'>بودكاست</h1>
            <article className="flex flex-col items-start justify-end mx-5 lg:w-[90%] lg:m-auto relative rounded-3xl bg-neutral-300">
                <div className="relative w-full h-full rounded-3xl z-20 overflow-hidden">
                    {spotifyUrl ? (
                        <iframe
                            src={`https://open.spotify.com/embed/episode/${spotifyUrl.split('/').pop()}`}
                            width="100%"
                            height="352px"
                            frameBorder="0"
                            allow="encrypted-media"
                        />
                    ) : (
                        <div className="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xl">Error loading podcast</span>
                        </div>
                    )}
                </div>
            </article>
        </div>
    );
};

export default CoverSection;
