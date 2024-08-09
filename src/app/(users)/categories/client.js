"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RecentPost from "@/src/components/VideoHome/RecentPosts";
import RecentPosts from "@/src/components/BlogHome/RecentPosts";
import SearchComponent from "@/src/components/VideoHome/SearchComponent";

const CategoriesClient = () => {
  const [selectedOption, setSelectedOption] = useState("فيديوهات");
  const [selectedTag, setSelectedTag] = useState("0");
  const [searchText, setSearchText] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
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
        {typeParam === "videos" && <RecentPost hideHeader={true} />}
        {typeParam === "posts" && <RecentPosts hideHeader={true} />}
      </div>
    </div>
  );
};

export default CategoriesClient;
