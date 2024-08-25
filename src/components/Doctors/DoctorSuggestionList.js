import Image from "next/image";
import Link from "next/link";
import avatar from "@/public/noavatar.png";
import { useEffect, useState } from "react";
import api from "@/src/utils/api";
import StarRating from "../Booking/StarRating";

const SuggestionList = ({ blog }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/Doctor/GetDoctors')
      .then(response => {
        const availableDoctors = response.data.items.filter(doctor => doctor.isAvailable);
        setDoctors(availableDoctors);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
        setLoading(false);
      });
  }, []);

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

  return (
    <div className="pt-4 px-4 border-[1px] lg:mx-5 rounded-lg">
      {blog ? (
        <Link href="/booking-Doctor">
          <h1 className="mb-3 md:text-2xl text-lg tajawal-medium text-primary">دكتور اونلاين ؟</h1>
          <p className="text-gray-500 text-sm md:text-base tajawal-regular">اطمن علي صحتك دلوقتي من بيتك مع افضل الدكاترة في مصر والوطن العربي <span className="text-accent">من هنا</span></p>
        </Link>
      ) : (
        <div className="flex items-center mx-3 m-auto justify-between">
          <h1 className="mb-3 text-lg md:text-xl tajawal-medium text-primary">اقتراحات</h1>
          <Link href="/booking-Doctor" className="mb-3 text-sm md:text-base tajawal-medium text-accent hover:underline">المزيد</Link>
        </div>
      )}

      {loading ? (
        [...Array(4)].map((_, index) => (
          <div key={index} className="cursor-pointer p-4 hover:bg-slate-100 rounded-lg flex items-center gap-3 animate-pulse">
            <div className="w-[70px] h-[70px] rounded-full bg-gray-300 mr-5" />
            <div className="mt-3 p-1 px-2 flex flex-col gap-2 w-full">
              <div className="bg-gray-300 px-2 p-1 rounded-full text-[10px] w-1/2 h-4" />
              <div className="bg-gray-300 h-6 rounded w-3/4" />
              <div className="flex items-center w-full justify-between">
                <div className="bg-gray-300 h-4 rounded w-1/4" />
                <div className="bg-gray-300 h-4 rounded w-1/3" />
              </div>
            </div>
          </div>
        ))
      ) : (
        doctors.slice(0, 4).map((doctor) => (
          <Link
            key={doctor.doctorId}
            href={`/booking-Doctor/${doctor.doctorId}`}
            className="cursor-pointer p-1 px-2 md:p-4 hover:bg-slate-100 rounded-lg flex items-center gap-3"
          >
            <Image
              src={doctor.profilePicture ? doctor.profilePicture : avatar}
              alt="Doctor Image"
              width={200}
              height={200}
              className="w-[60px] h-[80px] md:w-[70px] md:h-[100px] rounded-lg  mr-5"
              unoptimized={true}
            />
            <div className="mt-3 p-1 px-2 flex flex-col gap-2 w-full">
              <h2 className="tajawal-bold text-primary bg-teal-100 px-2 p-1 rounded-full text-[10px] w-fit">
                {doctor.category}
              </h2>
              <h2 className="tajawal-medium md:text-lg">
                {doctor.firstName} {doctor.lastName}
              </h2>
              <div className="flex items-center w-full justify-between">
                <StarRating rating={roundRating(doctor.rating)} size={20} />
                <h2 className="tajawal-regular text-gray-500 flex gap-2 text-sm">
                  الكشف : {doctor.consultationPrice}ج
                </h2>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default SuggestionList;
