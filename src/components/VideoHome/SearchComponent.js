"use client";

import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";

const SearchComponent = ({
  selectedOption,
  setSelectedOption,
  selectedTag,
  setSelectedTag,
  searchText,
  setSearchText,
  isFeatured,
  setIsFeatured,
  handleSearch,
}) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.2l2ana.com/api/Tags")
      .then((response) => {
        const filteredTags = response.data.tags.filter(
          (tag) => tag.name !== "featured"
        );
        setTags([{ id: 0, name: "الكل" }, ...filteredTags]);
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
      });
  }, []);

  const tagOptions = tags.map((tag) => ({ value: tag.id, label: tag.name }));
  const optionOptions = [
    { value: "فيديوهات", label: "فيديوهات" },
    { value: "مقالات", label: "مقالات" },
  ];

  return (
    <div className="flex flex-col mt-20 items-start border-admin1 border p-4 bg-primary gap-4 rounded w-full md:w-[80%] m-auto lg:min-w-[280px] lg:max-w-[280px] lg:h-fit lg:sticky lg:top-40">
      <div className="flex flex-col w-full">
        <label htmlFor="search" className="tajawal-bold mb-2 text-white">
          بحث :
        </label>
        <input
          type="text"
          id="search"
          placeholder={
            selectedOption === "فيديوهات"
              ? "دور علي اسم الفيديو"
              : "دور علي اسم المقال"
          }
          className="w-full tajawal-bold px-2 py-2 text-right bg-white text-black border-none outline-none mb-4 rounded"
          style={{ direction: "rtl" }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="flex flex-col w-full">
        <label className="mb-2 tajawal-bold text-white">النوع:</label>
        <Select
          options={optionOptions}
          value={optionOptions.find(
            (option) => option.value === selectedOption
          )}
          onChange={(selected) => setSelectedOption(selected.value)}
          className="tajawal-bold text-black border-none outline-none cursor-pointer w-full rounded"
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        />
      </div>

      {/* <div className="flex flex-col w-full">
        <label className="mb-2 tajawal-bold text-white">التخصص:</label>
        <Select
          options={tagOptions}
          value={tagOptions.find((tag) => tag.value === selectedTag)}
          onChange={(selected) => setSelectedTag(selected.value)}
          className="tajawal-bold text-black border-none outline-none cursor-pointer w-full rounded"
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        />
      </div>

      <div className="flex items-center mr-2 w-full">
        <label htmlFor="featured" className="tajawal-bold text-white">
          رائج ؟
        </label>
        <input
          type="checkbox"
          checked={isFeatured}
          onChange={() => setIsFeatured(!isFeatured)}
          className="mr-2"
          id="featured"
        />
      </div> */}

      <button
        onClick={handleSearch}
        className="w-full px-4 py-2 tajawal-extrabold text-primary bg-white rounded"
      >
        بحث
      </button>
    </div>
  );
};

export default SearchComponent;
