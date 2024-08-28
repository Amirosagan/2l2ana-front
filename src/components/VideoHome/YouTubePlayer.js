"use client"
import React from 'react';
import YouTube from 'react-youtube';

const YouTubePlayer = ({ videoUrl }) => {
  let videoId = null;

  try {
    videoId = new URLSearchParams(new URL(videoUrl).search).get("v");
  } catch (error) {
    console.error("Invalid URL:", videoUrl);
    videoId = null;
  }

  if (!videoId) {
    return (
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-200">
        Invalid Video URL
      </div>
    );
  }

  return (
    <YouTube
      videoId={videoId}
      className="absolute top-0 left-0 h-full w-full"
      opts={{
        width: "100%",
        height: "100%",
        playerVars: { autoplay: 0 },
      }}
    />
  );
};

export default YouTubePlayer;
