"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import YouTube from "react-youtube";
import Head from "next/head";
import api from "@/src/utils/api";

const VideoPageClient = ({ initialVideoDetails }) => {
  const [videoDetails, setVideoDetails] = useState(initialVideoDetails);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedVideos = async () => {
      try {
        console.log("Fetching related videos...");
        const response = await api.get("/Youtube");
        const allVideos = response.data.items;
        console.log("All videos:", allVideos);

        const otherVideos = allVideos.filter(video => video.youtubeLink.id !== videoDetails.id);
        console.log("Other videos:", otherVideos);

        const matchingTagVideos = otherVideos.filter(video =>
          video.youtubeLink.tags.some(tag =>
            tags.some(t => t.name !== "featured" && t.name === tag.name)
          )
        );
        console.log("Matching tag videos:", matchingTagVideos);

        const featuredAndMatchingTagVideos = matchingTagVideos.filter(video =>
          video.youtubeLink.tags.some(tag => tag.name === "featured")
        );
        console.log("Featured and matching tag videos:", featuredAndMatchingTagVideos);

        const nonFeaturedMatchingTagVideos = matchingTagVideos.filter(video =>
          !video.youtubeLink.tags.some(tag => tag.name === "featured")
        );
        console.log("Non-featured matching tag videos:", nonFeaturedMatchingTagVideos);

        const recentMatchingTagVideos = nonFeaturedMatchingTagVideos.sort((a, b) => new Date(b.youtubeLink.lastUpdate) - new Date(a.youtubeLink.lastUpdate));
        console.log("Recent matching tag videos:", recentMatchingTagVideos);

        const combinedVideos = [...featuredAndMatchingTagVideos, ...recentMatchingTagVideos].slice(0, 3);
        console.log("Combined related videos:", combinedVideos);

        setRelatedVideos(combinedVideos);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching related videos:', error);
        setIsLoading(false);
      }
    };

    if (videoDetails && tags.length > 0) {
      fetchRelatedVideos();
    } else {
      setIsLoading(false); // Set loading to false if no video details or tags
    }
  }, [videoDetails, tags]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await api.get(`/Youtube/${videoDetails.id}`);
        const fetchedTags = response.data.youtubeLink.tags.filter(tag => tag.name !== "featured");
        setTags(fetchedTags);
        console.log("Fetched tags:", fetchedTags);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    if (videoDetails) {
      fetchTags();
    }
  }, [videoDetails]);

  if (!videoDetails) {
    return (
      <div className="flex justify-center bg-slate-300 items-center tajawal-bold text-5xl">
        <div className="w-[70%] h-[400px] bg-neutral-300-300 flex justify-center items-center">
          Invalid video details
        </div>
      </div>
    );
  }

  const extractVideoId = (url) => {
    try {
      const urlParams = new URLSearchParams(new URL(url).search);
      return urlParams.get("v");
    } catch (error) {
      console.error('Error extracting video ID:', error);
      return null;
    }
  };

  const videoOptions = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  const smallVideoOptions = {
    height: '240',
    width: '380',
    playerVars: {
      autoplay: 0,
    },
  };

  const { title, url } = videoDetails;
  const videoId = extractVideoId(url);
  const firstNonFeaturedTagName = tags.find(tag => tag.name !== "featured")?.name || '';

  return (
    <div className="lg:w-[70%] px-4 w-full m-auto bg-white mt-5">
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={title} />
        <meta property="og:type" content="video.movie" />
        <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
        <meta property="og:video" content={`https://www.youtube.com/watch?v=${videoId}`} />
        <meta property="og:video:type" content="text/html" />
        <meta property="og:video:width" content="1000" />
        <meta property="og:video:height" content="520" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={title} />
        <meta name="twitter:video" content={`https://www.youtube.com/watch?v=${videoId}`} />
      </Head>

      <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center p-2">
        <h1 style={{ color: "rgb(52 146 150)" }} className="tajawal-extrabold text-2xl lg:text-3xl">{title}</h1>
        {tags.length > 0 && (
          <div className="flex gap-2">
            {tags.map(tag => (
              <Link href="/" key={tag.id}>
                <span className="tajawal-medium md:text-lg underline text-accent">{tag.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-10 mt-5 text-slate-500 items-center">
          <p>{title}</p>
          <div className="youtube-video-container w-full h-[520px] xl:h-[calc(100vh-250px)]">
            {isLoading ? (
              <div className="w-full h-full bg-slate-100 flex justify-center items-center">
                <div className="loader">Loading...</div>
              </div>
            ) : (
              <YouTube className="youtube-video w-full h-full" videoId={videoId} opts={videoOptions} />
            )}
          </div>
        </div>
        <Link href="/reservation" className="text-accent tajawal-bold px-2 hover:underline">
          احجزي كشف اونلاين مع افضل الدكاترة في مجال {firstNonFeaturedTagName}
        </Link>
      </div>

      <div className="text-accent mt-16 w-full flex flex-col">
        <h1 className="pb-4">فيديوهات مشابهة:</h1>
        <div className="flex justify-around items-center flex-col md:flex-row flex-wrap gap-5 md:gap-2 w-full relative">
          {relatedVideos.map((relatedVideo, index) => (
            <div key={index} className="flex flex-col md:w-[30%] relative">
              <div className="youtube-video-container flex flex-col items-center h-auto">
                <YouTube className="small-youtube-video bg-slate-100" videoId={extractVideoId(relatedVideo.youtubeLink.url)} opts={smallVideoOptions} />
              </div>
              <p className="mt-2 bg-transparent tajawal-bold">{relatedVideo.youtubeLink.title}</p>
              <Link href={`/videos/${relatedVideo.youtubeLink.id}`} className="absolute inset-0 z-10"></Link>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <Link href="/categories">
            <button className="bg-accent text-white p-4 px-14 tajawal-bold hover:scale-105 transition-all duration-200 rounded-md cursor-pointer font-bold mt-10">
              المزيد
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoPageClient;
