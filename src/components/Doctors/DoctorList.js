import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Rating from "@/src/components/ELements/Rating"; 

const roundRating = (rating) => {
  if (rating > 4.59) return 5;
  if (rating >= 4.2 && rating <= 4.59) return 4.5;
  if (rating >= 3.6 && rating < 4.2) return 4;
  if (rating >= 3.2 && rating < 3.6) return 3.5;
  if (rating >= 2.6 && rating < 3.2) return 3;
  if (rating >= 2.2 && rating < 2.6) return 2.5;
  if (rating >= 1.6 && rating < 2.2) return 2;
  if (rating >= 1.2 && rating < 1.6) return 1.5;
  if (rating >= 0.6 && rating < 1.2) return 1;
  return 5;
};

const DoctorList = ({ doctorList }) => {
  const router = useRouter();

  const handleDoctorClick = (doctorId) => {
    router.push(`/booking-Doctor/${doctorId}`);
  };

  return (
    <div className="mb-10 md:mx-24 m-auto md:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {doctorList.map((doctor) => (
          <div
            key={doctor.doctorId}
            className="border-[1px] cursor-pointer hover:border-primary bg-neutral-50 transition-all ease-in-out hover:shadow-sm rounded-lg p-3 flex flex-col justify-between"
            onClick={() => handleDoctorClick(doctor.doctorId)}
          >
            <Image
              width={500}
              height={200}
              className="h-[200px] w-full object-cover rounded-lg"
              src={doctor.profilePicture}
              alt={`${doctor.firstName} ${doctor.lastName}`}
              unoptimized={true}
            />
            <div className="mt-3 flex-grow flex flex-col items-start gap-2">
              <h2 className="text-[10px] p-1 rounded-full px-5 py-2 text-primary bg-[rgb(218,231,239)]">
                {doctor.category || "تخصص عام"}
              </h2>
              <h2 className="font-bold">
                {doctor.firstName} {doctor.lastName}
              </h2>
              <h3 className="text-sm text-gray-600">{doctor.headLine}</h3>
            </div>
            <div className="flex flex-col mt-3">
              <div className="flex items-center justify-between">
                <Rating rating={roundRating(doctor.rating)} />
                <h2 className="text-gray tajawal-regular text-sm md:text-base">
                  الكشف : {doctor.consultationPrice} ج
                </h2>
              </div>
              <h2 className="p-2 px-3 transition-all duration-300 border-[1px] tajawal-bold text-base hover:text-white w-full hover:bg-primary cursor-pointer mt-2 text-[11px] text-center rounded-full text-primary border-primary">
                احجز الأن
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
