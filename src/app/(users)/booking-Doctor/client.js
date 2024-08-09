"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import api from "@/src/utils/api";
import DoctorList from "@/src/components/Doctors/DoctorList";
import SearchDoctorBar from "@/src/components/Doctors/DoctorSearchbar";
import HeroDoctor from "@/src/components/Doctors/HeroDoctor";
import { Button } from "@mui/material";

const MainDoctorPageClient = () => {
  const [doctorList, setDoctorList] = useState([]);
  const [pageSize, setPageSize] = useState(20);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const sectionRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = useCallback(async (category = "", searchTerm = "") => {
    try {
      const response = await api.get('/Doctor/GetDoctors');
      const filteredDoctors = response.data.items.filter(doctor => 
        (category ? doctor.category === category : true) &&
        (searchTerm ? (
          doctor.firstName.includes(searchTerm) ||
          doctor.lastName.includes(searchTerm) ||
          doctor.category.includes(searchTerm)
        ) : true)
      );
      setTotalDoctors(filteredDoctors.length);
      setDoctorList(filteredDoctors.slice(0, pageSize));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setLoading(false);
    }
  }, [pageSize]);

  useEffect(() => {
    fetchDoctors(category, searchTerm);
  }, [fetchDoctors, category, searchTerm]);

  const scrollToSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoadMore = () => {
    setPageSize(prevSize => prevSize + 10);
  };

  return (
    <div className=" mt-20 md:mt-5 pb-3  md:pt-7" style={{ background: "" }}>
   
      <div className="">
        <div id="search-section" className="xl:mx-[7%] mx-10  m-auto" ref={sectionRef}>
          <SearchDoctorBar 
            onSearch={(category, searchTerm) => {
              setCategory(category);
              setSearchTerm(searchTerm);
              fetchDoctors(category, searchTerm);
            }} 
          />
          {loading ? (
            <div className="mb-10 md:mx-24 m-auto px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="border-[1px] cursor-pointer transition-all ease-in-out rounded-lg p-3 bg-gray-200 animate-pulse"
                  >
                    <div className="h-[200px] w-full rounded-lg bg-gray-300"></div>
                    <div className="mt-3 flex flex-col items-start gap-2">
                      <div className="h-4 w-1/3 rounded-full bg-gray-300"></div>
                      <div className="h-6 w-2/3 rounded bg-gray-300"></div>
                      <div className="h-4 w-1/2 rounded bg-gray-300"></div>
                      <div className="h-4 w-1/3 rounded bg-gray-300"></div>
                      <div className="h-8 w-full rounded-full bg-gray-300"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <DoctorList doctorList={doctorList} />
          )}
          {doctorList.length < totalDoctors && !loading && (
            <div className="flex justify-center mt-5">
              <Button variant="contained" onClick={handleLoadMore}>
                اعرض المزيد
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainDoctorPageClient;
