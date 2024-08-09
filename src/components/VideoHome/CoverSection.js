'use client';

import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import api from '@/src/utils/api';

const CoverSection = () => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLastVideo = async () => {
      try {
        const response = await api.get('/Youtube');
        const videos = response.data.items;
        setVideo(videos.length > 0 ? videos[videos.length - 1] : null);
      } catch (error) {
        console.error('Error fetching video:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLastVideo();
  }, []);

  if (loading) {
    return (
      <div className="w-full md:inline-block">
        <h1 className='text-3xl mx-4 mb-5' style={{ color: "rgb(92, 194, 198)" }}>الفيديوهات</h1>
        <article className="flex flex-col items-start justify-end mx-5 lg:w-[90%] lg:m-auto relative h-[40vh] md:h-[80vh]">
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

  if (!video) {
    return <div>Error loading video</div>;
  }

  const videoId = new URLSearchParams(new URL(video.youtubeLink.url).search).get("v");

  return (
    <div className="w-full md:inline-block">
      <h1 className='text-3xl mx-4 mb-5 md:hidden' style={{ color: "rgb(92, 194, 198)" }}>الفيديوهات</h1>
      <article className="flex flex-col items-start justify-end mx-5 lg:w-[90%] lg:m-auto relative h-[40vh] md:h-[80vh]">
        <div className="absolute top-0 left-0 bottom-0 right-0 h-full w-full bg-gradient-to-b from-transparent to-dark/90 rounded-3xl z-10" />
        <div className="relative w-full h-full rounded-3xl z-20 overflow-hidden">
          {videoId ? (
            <YouTube
              videoId={videoId}
              opts={{ width: '100%', height: '100%', playerVars: { rel: 0, modestbranding: 1 } }}
              className="absolute top-0 left-0 w-full h-full"
            />
          ) : (
            <div className="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-xl">Error loading video</span>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default CoverSection;
