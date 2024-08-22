"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import api from "@/src/utils/api";
import DoctorList from "@/src/components/Doctors/DoctorList";
import SearchDoctorBar from "@/src/components/Doctors/DoctorSearchbar";

const MainDoctorPageClient = () => {
  const [doctorList, setDoctorList] = useState([]);
  const [pageSize, setPageSize] = useState(12);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const sectionRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = useCallback(async (category = "", searchTerm = "") => {
    try {
      const response = await api.get('/Doctor/GetDoctors');
      const filteredDoctors = response.data.items.filter(doctor => 
        doctor.isAvailable &&  
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

  const handleLoadMore = () => {
    setPageSize(prevSize => prevSize + 12); 
  };

  return (
    <div className="mt-14 md:mt-5 lg:-mt-5 pb-3  ">
      <div className="xl:mx-[7%] mx-10 m-auto" ref={sectionRef}>
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
            <button onClick={handleLoadMore} className="p-3 bg-primary shadow-md text-white rounded-sm hover:scale-110 transition-all duration-300"> اعرض المزيد </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainDoctorPageClient;
