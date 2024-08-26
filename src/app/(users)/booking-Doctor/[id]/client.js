"use client";
import Details from "@/src/components/Doctors/DoctorDetails";
import SuggestionList from "@/src/components/Doctors/DoctorSuggestionList";
import api from "@/src/utils/api";
import { useEffect, useState } from "react";

const DoctorDetailsPageClient = ({ doctor }) => {
  const [currentDoctor, setCurrentDoctor] = useState(doctor);

  useEffect(() => {
    if (!currentDoctor.imageUrl) {
      api.get(`/Upload?path=${encodeURIComponent(currentDoctor.imageUrl)}`)
        .then((uploadResponse) => {
          setCurrentDoctor({
            ...currentDoctor,
            imageUrl: uploadResponse.data.fileUrl,
          });
        })
        .catch(() => {});
    }
  }, [currentDoctor]);

  if (!currentDoctor) {
    return (
      <div className="p-5 md:px-32">
        <h2 className="tajawal-bold text-[22px] hidden md:block text-primary">تفاصيل</h2>
        <div className="grid grid-cols-1 lg:grid-cols-9 gap-5">
          <div className="col-span-6 mb-10">
            <div className="bg-gray-300 h-64 rounded-lg mb-5"></div>
            <div className="bg-gray-300 h-10 rounded-lg mb-3"></div>
            <div className="bg-gray-300 h-6 rounded-lg mb-3 w-1/2"></div>
            <div className="bg-gray-300 h-6 rounded-lg mb-3 w-1/3"></div>
            <div className="bg-gray-300 h-6 rounded-lg mb-3 w-2/3"></div>
          </div>
          <div className="col-span-3 lg:mx-5 m-auto mt-5 lg:min-w-[370px] w-full">
            <div className="bg-gray-300 h-10 w-2/3 rounded-lg mb-3"></div>
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-300 h-16 w-full rounded-lg mb-3"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 -mt-5 md:mt-0 md:px-32">
      <h2 className="tajawal-bold text-[22px] hidden md:block text-primary">تفاصيل</h2>
      <div className="grid grid-cols-1 lg:grid-cols-9 gap-5">
        <div className="lg:col-span-6 mb-10">
          <Details doctor={currentDoctor} />
        </div>
        <div className="lg:col-span-3 lg:mx-5 m-auto mt-5 lg:min-w-[370px] w-full">
          <SuggestionList />
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailsPageClient;
