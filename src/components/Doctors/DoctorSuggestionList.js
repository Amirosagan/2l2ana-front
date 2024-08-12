import Image from "next/image";
import Link from "next/link";
import avatar from "@/public/noavatar.png";
import { useEffect, useState } from "react";
import api from "@/src/utils/api";

const SuggestionList = ({ blog }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/Doctor/GetDoctors')
      .then(response => {
        setDoctors(response.data.items);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="pt-4 px-4 border-[1px] lg:mx-5 rounded-lg">
      {blog ? (
        <Link href="/booking-Doctor">
          <h1 className="mb-3 text-2xl tajawal-medium text-primary">دكتور اونلاين ؟</h1>
          <p className="text-gray-500 tajawal-regular">اطمن علي صحتك دلوقتي من بيتك مع افضل الدكاترة في مصر والوطن العربي <span className="text-accent">من هنا</span></p>
        </Link>
      ) : (
        <div className="flex items-center mx-3 m-auto justify-between">
          <h1 className="mb-3 text-xl tajawal-medium text-primary">اقتراحات</h1>
          <Link href="/booking-Doctor" className="mb-3 text tajawal-medium text-accent hover:underline">المزيد</Link>
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
            className="cursor-pointer p-4 hover:bg-slate-100 rounded-lg flex items-center gap-3"
          >
            <Image
              src={doctor.imageUrl ? doctor.imageUrl : avatar}
              alt="Doctor Image"
              width={70}
              height={70}
              className="w-[70px] h-[70px] rounded-full mr-5"
              unoptimized={true}
            />
            <div className="mt-3 p-1 px-2 flex flex-col gap-2 w-full">
              <h2 className="tajawal-bold text-primary bg-teal-100 px-2 p-1 rounded-full text-[10px] w-fit">
                {doctor.category}
              </h2>
              <h2 className="tajawal-extrabold text-lg">
                {doctor.firstName} {doctor.lastName}
              </h2>
              <div className="flex items-center w-full justify-between">
                <h2 className="tajawal-regular text-gray-500 flex gap-2 text-md">
                  {doctor.rating} نجوم
                </h2>
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
