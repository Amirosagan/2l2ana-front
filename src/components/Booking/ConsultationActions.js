import React from "react";
import Tooltip from "@mui/material/Tooltip";

const ConsultationActions = ({
  consultation,
  role,
  isPrevious,
  isWithinWindow,
  isPastConsultation,
  isWithinCancelWindow,
  onShowNotes,
  onShowRatingModal,
  onCompleteConsultation,
  onCancelConsultation,
}) => {
  return (
    <div className="flex flex-col gap-4 mt-4 md:mt-0">
      {consultation.isDone && consultation.notes && (
        <button
          className="bg-white border-2 border-primary text-primary py-3 shadow-lg tajawal-regular hover:scale-105 transition-all duration-200 rounded-md w-[200px]"
          onClick={onShowNotes}
        >
          عرض ملاحظات الطبيب
        </button>
      )}

      {isPrevious && role !== "Doctor" && (
        consultation.rating === 0 ? (
          <button
            className="bg-primary text-white py-3 shadow-lg tajawal-regular hover:scale-105 transition-all duration-200 rounded-md w-[200px]"
            onClick={onShowRatingModal}
          >
            تقييم الكشف
          </button>
        ) : (
          <div className="flex justify-center items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${i < consultation.rating ? "text-yellow-400" : "text-gray-300"}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            ))}
          </div>
        )
      )}

      {role === "Doctor" && (
        isPastConsultation && !consultation.isDone ? (
          <button
            className="bg-primary text-white py-3 shadow-lg tajawal-regular hover:scale-105 transition-all duration-200 rounded-md w-[200px]"
            onClick={onCompleteConsultation}
          >
            اتمام الكشف
          </button>
        ) : (
          isWithinWindow && !consultation.isDone && (
            <Tooltip title={<span style={{ fontSize: '16px' }}>سيكون رابط الكشف متاحا قبل الموعد الذي تم اختياره بنصف ساعة</span>}>
              <a
                className="bg-primary text-white py-3 shadow-lg tajawal-regular hover:scale-105 transition-all duration-200 rounded-md w-[200px] text-center"
                href={consultation.meetingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Meeting
              </a>
            </Tooltip>
          )
        )
      )}

      {role !== "Doctor" && isWithinCancelWindow && (
        <button
          className="bg-red-500 text-white py-3 shadow-lg tajawal-regular hover:scale-105 transition-all duration-200 rounded-md w-[200px]"
          onClick={() => onCancelConsultation(consultation)}
        >
          الغاء الحجز
        </button>
      )}
    </div>
  );
};

export default ConsultationActions;
