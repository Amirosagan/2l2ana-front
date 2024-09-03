"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SearchDoctorBar from "@/src/components/Doctors/DoctorSearchbar";

const DoctorSearchClient = ({ searchTerm: initialSearchTerm, category: initialCategory }) => {
  const [category, setCategory] = useState(initialCategory || "");
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm || "");
  const router = useRouter();

  const handleSearch = () => {
    console.log("Searching with:", searchTerm, category); // Debugging: Check if the correct values are passed
    router.push(`?searchTerm=${searchTerm}&category=${category}`);
  };

  return (
    <SearchDoctorBar 
      category={category}
      searchTerm={searchTerm}
      onCategoryChange={(newCategory) => setCategory(newCategory)} 
      onSearchTermChange={(newSearchTerm) => setSearchTerm(newSearchTerm)} 
      onSearch={handleSearch} // Trigger search only on button click
    />
  );
};

export default DoctorSearchClient;
