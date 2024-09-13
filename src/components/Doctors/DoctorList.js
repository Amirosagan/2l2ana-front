"use client";

import React from "react";
import Image from "next/image";
import { Link } from '@/src/i18n/routing';
import { useTranslations } from 'next-intl';  
import Rating from "../ELements/Rating";

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

const DoctorList = ({ doctorList = [] }) => {
  const t = useTranslations('DoctorList');  // Use the translation hook

  if (doctorList.length === 0) {
    return <p>{t('noDoctorsFound')}</p>;  // Translated text
  }

  return (
    <div className="mb-10 xl:mx-[1%] m-auto md:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-7">
        {doctorList.map((doctor) => (
          <Link key={doctor.doctorId} href={`/booking-Doctor/${doctor.doctorId}`} passHref>
            <div className="border-[1px] min-h-[450px] max-h-[450px] lg:max-w-[300px] md:max-w-[294px] xl:max-w-[310px] cursor-pointer hover:border-primary bg-neutral-50 transition-all ease-in-out hover:shadow-sm rounded-lg p-3 flex flex-col justify-between">
              <Image
                width={500}
                height={200}
                className="h-[200px] w-full object-cover rounded-lg"
                src={doctor.profilePicture}
                alt={`${doctor.firstName} ${doctor.lastName}`}
                unoptimized={true}
              />
              <div dir="rtl" className="mt-3 flex-grow flex flex-col items-start gap-2">
                <h2 className="text-[12px] p-1 tajawal-bold rounded-full px-5 py-2 text-primary bg-[rgb(218,231,239)]">
                  {doctor.category || t('generalSpecialty')}  {/* Translated specialty */}
                </h2>
                <h2 className="tajawal-bold text-lg lg:-mb-1">
                  {doctor.firstName} {doctor.lastName}
                </h2>
                <h3 className="text-sm text-gray-600">{doctor.headLine}</h3>
              </div>
              <div className="flex flex-col mt-1">
                <div  className="flex flex-col items-start gap-2 justify-between">
                  <div >                   <Rating rating={roundRating(doctor.rating)} />
                  </div>
                  <div className="text-gray tajawal-regular text-sm md:text-base flex">
                    <h2 className="flex md:text-sm xl:text-[15px]">
                      {t('consultationPrice')}:{" "}
                      <span className="text-red-600 mx-2 line-through">
                        {doctor.consultationPriceBeforeDiscount}
                      </span>{" "}
                      {doctor.consultationPriceAfterDiscount} {t('currency')}
                    </h2>
                  </div>
                </div>
                <h2 className="p-2 px-3 transition-all duration-300 border-[1px] tajawal-bold text-base hover:text-white w-full hover:bg-primary cursor-pointer mt-2 text-[11px] text-center rounded-full text-primary border-primary">
                  {t('bookNow')}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
