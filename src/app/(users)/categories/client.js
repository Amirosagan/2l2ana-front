"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RecentPost from "@/src/components/VideoHome/RecentPosts";
import RecentPosts from "@/src/components/BlogHome/RecentPosts";
import SearchComponent from "@/src/components/VideoHome/SearchComponent";
import api from "@/src/utils/api";
import { slug } from "github-slugger";  

const CategoriesClient = () => {
  const [selectedOption, setSelectedOption] = useState("فيديوهات");
  const [selectedTag, setSelectedTag] = useState("0");
  const [searchText, setSearchText] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [videos, setVideos] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type") || "videos";
  const tagParam = searchParams.get("tag") || "0";
  const searchParam = searchParams.get("search") || "";
  const hideHeader = searchParams.get("hideHeader") === "true";

  useEffect(() => {
    setSelectedOption(typeParam === "videos" ? "فيديوهات" : "مقالات");
    setSelectedTag(tagParam);
    setSearchText(searchParam);
  }, [typeParam, tagParam, searchParam]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedOption === "فيديوهات") {
          const res = await api.get("/Youtube");
          const allVideos = res.data.items;

          const filteredVideos = allVideos.filter((video) =>
            (selectedTag === "0" || video.youtubeLink.tags.some(tag => tag.id === selectedTag)) &&
            (isFeatured ? video.youtubeLink.tags.some(tag => tag.name === "featured") : true) &&
            (searchText === "" || video.youtubeLink.title.includes(searchText))
          );

          setVideos(filteredVideos);
        } else if (selectedOption === "مقالات") {
          const res = await api.get("/Post");
          console.log("API response:", res.data);  // Log the entire response

          const allBlogs = res.data.items.map((item) => ({
            id: item.id,
            title: item.title,
            publishedAt: item.createdAt,
            image: {
              filePath: item.imageUrl,
              blurhashDataUrl: '',
              width: 800,
              height: 600,
            },
            tags: item.tags.map((tag) => tag.name),  // Transform tags to strings
            url: `/blogs/${slug(item.id)}`,
          }));

          console.log("Processed blogs:", allBlogs);  // Log the processed blogs

          if (allBlogs.length > 0) {
            setBlogs(allBlogs);  // Only set blogs if there is data
          } else {
            console.warn("No blogs found");
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [selectedOption, selectedTag, searchText, isFeatured]);

  const handleSearch = () => {
    const type = selectedOption === "فيديوهات" ? "videos" : "posts";
    const queryParams = new URLSearchParams({
      type,
      tag: selectedTag,
      search: searchText,
      featured: isFeatured.toString(),
    });
    router.push(`/categories?${queryParams.toString()}`);
  };

  return (
    <div className="flex flex-col lg:flex-row mx-10 m-auto justify-center">
      <div className="flex flex-col lg:mr-8 lg:w-[280px]">
        <SearchComponent
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          selectedTag={setSelectedTag}
          searchText={searchText}
          setSearchText={setSearchText}
          isFeatured={isFeatured}
          setIsFeatured={setIsFeatured}
          handleSearch={handleSearch}
        />
      </div>
      <div className="flex-grow mt-10 lg:mt-0">
        {selectedOption === "فيديوهات" && (
          <RecentPost videos={videos} hideHeader={hideHeader} />
        )}
        {selectedOption === "مقالات" && (
          <div className="lg:-mt-12">
          <RecentPosts blogs={blogs} hideHeader={hideHeader} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesClient;
