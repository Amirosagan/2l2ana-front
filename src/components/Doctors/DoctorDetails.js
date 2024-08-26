import avatar from "@/public/noavatar.png";
import { BadgeInfo, ClipboardPlus } from "lucide-react";
import Image from "next/image";
import BookAppointment from "../Booking/BookAppointment";
import Rating from "../ELements/Rating";

// Rating rounding function
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

// Calculate original price before a 20% discount
const calculateOriginalPrice = (currentPrice) => {
  return Math.round(currentPrice / 0.8);
};

const Details = ({ doctor }) => {
  const originalPrice = calculateOriginalPrice(doctor.consultationPriceAfterDiscount);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 border-[1px] p-5 md:mt-5 rounded-lg">
        <div className="">
          <Image
            src={doctor.imageUrl ? doctor.imageUrl : avatar}
            alt="Doctor Image"
            width={200}
            height={200}
            className="rounded-lg h-[240px] lg:min-h-[280px] w-full object-cover"
            unoptimized={true}
          />
        </div>

        <div className="col-span-2 mt-5 md:px-10 flex flex-col gap-3">
          <h2 className="tajawal-bold text-2xl">
            {doctor.name}
          </h2>
          <h2 className="tajawal-bold text-primary w-fit bg-teal-100 px-3 p-2 rounded-full text-[12px]">
            {doctor.category || "تخصص عام"}
          </h2>
          <h2 className="tajawal-regular text-gray-500 flex gap-2 text-md">
            <ClipboardPlus /> {doctor.headLine}
          </h2>
          <div className="tajawal-regular text-gray-500 flex flex-col items-start gap-2 text-md">
            <Rating rating={roundRating(doctor.rating)} />  
            <div className="flex items-center text-gray tajawal-regular text-sm md:text-base">
              الكشف : <span className="text-red-600 mx-2 line-through">{doctor.consultationPriceBeforeDiscount} ج</span> {doctor.consultationPriceAfterDiscount} ج
            </div>
          </div>

          <div className="flex items-center mt-2 md:mt-5">
            <BookAppointment doctorId={doctor.doctorId} availableTimes={doctor.timesRanges} />
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
