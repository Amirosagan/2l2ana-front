import React from 'react'
import OfflineCard from './OfflineCard'
import firstCase from "@/public/first_medical_case.webp";
import secondCase from "@/public/second_medical_case.webp";
import thirdCase from "@/public/third-case.jpg";
import fourthCase from "@/public/fourth_medical_case.webp";

function OfflineSection() {
  const cases = [
    {
      img: firstCase,
      title: "الأمراض النسائية",
      lists: [
        "التهاب المهبل البكتيري",
        "الفطريات خلال الحمل",
        "طرق منع الحمل",
        "التهاب المثانة",
        "عدم انتظام الدورة"
      ]
    },
    {
      img: secondCase,
      title: "أمراض الأنف والأذن والحنجرة",
      lists: [
        "التهاب الجيوب",
        "التهاب الجهاز التنفسي",
        "السعال",
        "التهاب الأذن",
        "ألم الحلق",
        "الحساسية"
      ]
    },
    {
      img: thirdCase,
      title: "الأمراض النفسية",
      lists: [
        "الاكتئاب",
        "القلق",
        "الاضطراب ثنائي القطب",
        "اضطرابات النوم",
        "اضطراب ما بعد الصدمة",
        "الفصام"
      ]
    },
    {
      img: fourthCase,
      title: "الأمراض الجلدية",
      lists: [
        "التهاب الجلد",
        "الصدفية",
        "حب الشباب",
        "تساقط الشعر",
        "الإكزيما"
      ]
    }
  ];

  return (
    <div className='flex justify-center items-center   w-full p-10 pb-20 flex-col '>
      <h1 className='text-2xl md:text-3xl mt-10'>
        بعض الحالات التي يمكن التعامل معها عبر خدمات الرعاية الصحية عن بُعد
      </h1>
      <p className='text-gray-500 text-sm md:text-base mt-5 sm:mb-5 lg:mb-0'>اسأل الأطباء حول معظم الحالات الصحية دون الحاجة لمغادرة المنزل</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-6 lg:mt-16 w-full lg:w-[80%]'>
        {cases.map((item, index) => (
          <OfflineCard key={index} img={item.img} title={item.title} lists={item.lists} />
        ))}
      </div>
    </div>
  )
}

export default OfflineSection
