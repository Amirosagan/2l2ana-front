"use client";

import { useState, useEffect } from "react";
import {  useSearchParams } from "next/navigation";
import SearchComponent from "@/src/components/VideoHome/SearchComponent";
import CategoryVideos from "@/src/components/CategoryVideos";
import api from "@/src/utils/api";
import { slug } from "github-slugger";
import CategoryPosts from "@/src/components/categoryPost";
import { useRouter } from "@/src/i18n/routing";

const CategoriesClient = () => {
  const [selectedOption, setSelectedOption] = useState("فيديوهات");
  const [selectedTag, setSelectedTag] = useState("0");
  const [searchText, setSearchText] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [videos, setVideos] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [videoTotalCount, setVideoTotalCount] = useState(0); // Video total count
  const [blogTotalCount, setBlogTotalCount] = useState(0); // Blog total count
  const [loading, setLoading] = useState(true);

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
        setLoading(true);
        let allBlogs = [];
        let allVideos = [];
        let currentPage = 1;
        const pageSize = 10; // Adjust this based on your API's page size

        if (selectedOption === "فيديوهات") {
          let hasNextPage = true;
          while (hasNextPage) {
            const res = await api.get(`/Youtube?page=${currentPage}&pageSize=${pageSize}`, { cache: "no-cache" });
            const pageVideos = res.data.items;
            allVideos = [...allVideos, ...pageVideos]; // Append new videos
            setVideoTotalCount(res.data.totalCount); // Set total count
            hasNextPage = res.data.hasNextPage; // Check if more pages exist
            currentPage++;
          }

          const filteredVideos = allVideos.filter((video) => {
            const matchesTag =
              selectedTag === "0" ||
              video.youtubeLink.tags.some((tag) => tag.id.toString() === selectedTag);
            const matchesFeatured =
              !isFeatured || video.youtubeLink.tags.some((tag) => tag.name === "featured");
            const matchesSearchText =
              searchText === "" || video.youtubeLink.title.includes(searchText);

            return matchesTag && matchesFeatured && matchesSearchText;
          });

          setVideos(filteredVideos);
        } else if (selectedOption === "مقالات") {
          let hasNextPage = true;
          while (hasNextPage) {
            const res = await api.get(`/Post?page=${currentPage}&pageSize=${pageSize}`, { cache: "no-cache" });
            const pageBlogs = res.data.items.map((item) => ({
              id: item.id,
              title: item.title,
              publishedAt: item.createdAt,
              image: {
                filePath: item.imageUrl,
                blurhashDataUrl: "",
                width: 800,
                height: 600,
              },
              tags: item.tags.map((tag) => tag.name),
              url: `/blogs/${slug(item.id)}`,
            }));
            allBlogs = [...allBlogs, ...pageBlogs]; // Append new blogs
            setBlogTotalCount(res.data.totalCount); // Set total count
            hasNextPage = res.data.hasNextPage; // Check if more pages exist
            currentPage++;
          }

          const filteredBlogs = allBlogs.filter((blog) => {
            const matchesTag =
              selectedTag === "0" || blog.tags.some((tag) => tag.id.toString() === selectedTag);
            const matchesSearchText = searchText === "" || blog.title.includes(searchText);

            return matchesTag && matchesSearchText;
          });

          setBlogs(filteredBlogs);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
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
          <div>
            <CategoryVideos videos={videos} hideHeader={hideHeader} loading={loading} />
          </div>
        )}
        {selectedOption === "مقالات" && (
          <div className="lg:-mt-12">
            <CategoryPosts blogs={blogs} hideHeader={hideHeader} loading={loading} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesClient;
