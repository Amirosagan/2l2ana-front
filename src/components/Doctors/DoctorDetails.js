import avatar from "@/public/noavatar.png";
import { BadgeInfo, ClipboardPlus } from "lucide-react";
import Image from "next/image";
import BookAppointment from "./BookAppointment";

const Details = ({ doctor }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 border-[1px] p-5 mt-5 rounded-lg">
        <div className="">
          <Image
            src={doctor.imageUrl ? doctor.imageUrl : avatar}
            alt="Doctor Image"
            width={200}
            height={200}
            className="rounded-lg h-[240px] lg:min-h-[280px]  w-full object-cover"
            unoptimized={true}

          />
        </div>

        <div className="col-span-2 mt-5 md:px-10 flex flex-col gap-3">
          <h2 className="tajawal-extrabold text-2xl">
            {doctor.name}
          </h2>
          <h2 className="tajawal-bold text-primary w-fit bg-teal-100 px-3 p-2 rounded-full text-[12px]">
            {doctor.category || "تخصص عام"}
          </h2>
          <h2 className="tajawal-regular text-gray-500 flex gap-2 text-md">
            <ClipboardPlus /> {doctor.headLine}
          </h2>
          <h2 className="tajawal-regular text-gray-500 flex gap-2 text-md">
            {doctor.rating} نجوم
          </h2>

          <div className="flex items-center">
            <BookAppointment doctorId={doctor.doctorId} />
          </div>
        </div>
      </div>
      <div className="p-3 border-[1px] rounded-lg mt-5">
        <h2 className="tajawal-medium text-[18px] flex gap-2 items-center text-primary">
          <BadgeInfo className="p-[1px]" /> معلومات عن الدكتور
        </h2>
        <p className="text-gray-500 tracking-wide text-[15px] mt-4 p-2">
          {doctor.description || "لا توجد معلومات إضافية."}
        </p>
      </div>
    </>
  );
};

export default Details;
