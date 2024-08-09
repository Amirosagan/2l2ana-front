import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const sortVideos = (videos) => {
  // Define your sorting logic here
  return videos.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
};

export const featuredVideos = (videos) => {
  // Define your logic to get featured videos here
  return videos.filter(video => video.isFeatured);
};

