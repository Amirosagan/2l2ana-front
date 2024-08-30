"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SearchDoctorBar from "@/src/components/Doctors/DoctorSearchbar";

const DoctorSearchClient = ({ searchTerm: initialSearchTerm, category: initialCategory }) => {
  const [category, setCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const router = useRouter();

  const handleSearch = () => {
    router.push(`?searchTerm=${searchTerm}&category=${category}`);
  };

  return (
    <SearchDoctorBar 
      onSearch={(newCategory, newSearchTerm) => {
        setCategory(newCategory);
        setSearchTerm(newSearchTerm);
        handleSearch();
      }} 
    />
  );
};

export default DoctorSearchClient;
