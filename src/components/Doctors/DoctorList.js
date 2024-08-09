"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import avatar from "@/public/noavatar.png";

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
            className="border-[1px] cursor-pointer hover:border-primary bg-neutral-50 transition-all ease-in-out hover:shadow-sm rounded-lg p-3"
            onClick={() => handleDoctorClick(doctor.doctorId)}
          >
            <Image
              width={500}
              height={200}
              className="h-[200px] w-full object-cover rounded-lg"
              src={doctor.profilePicture}
              alt={`${doctor.firstName} ${doctor.lastName}`}
            />
            <div className="mt-3 flex flex-col items-start gap-2">
              <h2 className="text-[10px] p-1 rounded-full px-5 py-2 text-primary bg-teal-400">
                {doctor.category || "تخصص عام"}
              </h2>
              <h2 className="font-bold">
                {doctor.firstName} {doctor.lastName}
              </h2>
              <h2 className="text-primary tajawal-bold text-sm">
                التقييم {doctor.rating}/5
              </h2>
              <h2 className="text-gray tajawal-regular text-sm">
                الكشف : {doctor.consultationPrice} ج
              </h2>
              <h2 className="p-2 px-3 border-[1px] tajawal-bold text-base hover:text-white w-full hover:bg-primary cursor-pointer mt-2 text-[11px] text-center rounded-full text-primary border-primary">
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
