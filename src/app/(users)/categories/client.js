"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RecentPost from "@/src/components/VideoHome/RecentPosts";
import RecentPosts from "@/src/components/BlogHome/RecentPosts";
import SearchComponent from "@/src/components/VideoHome/SearchComponent";
import api from "@/src/utils/api";

const CategoriesClient = () => {
  const [selectedOption, setSelectedOption] = useState("فيديوهات");
  const [selectedTag, setSelectedTag] = useState("0");
  const [searchText, setSearchText] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [videos, setVideos] = useState([]);
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
        }
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      }
    };

    if (selectedOption === "فيديوهات") {
      fetchData();
    }
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
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
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
          <RecentPosts hideHeader={hideHeader} />
        )}
      </div>
    </div>
  );
};

export default CategoriesClient;
