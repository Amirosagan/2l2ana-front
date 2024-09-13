import React from "react";
import { Calendar, ClipboardPlus, Clock } from "lucide-react";
import ConsultationActions from "./ConsultationActions";
import ConsultationFiles from "./ConsultationFiles";

const ConsultationCard = ({
  consultation,
  doctor,
  user,
  files,
  role,
  isPrevious,
  onShowNotes,
  onShowRatingModal,
  onCompleteConsultation,
  downloadLoading,
  handleDownloadFile,
  onUpdateConsultation,
  onCancelConsultation,  // Added this prop
}) => {
  const displayName = role !== "Doctor"
    ? doctor?.name || "Unknown Doctor"
    : consultation.userId || "Anonymous";

  const currentTime = new Date();
  const consultationTime = new Date(consultation.date);
  const timeDifference = currentTime - consultationTime;

  const isWithinWindow =
    timeDifference >= -600000 && // 10 minutes before the consultation
    timeDifference <= 3600000; // 1 hour after the consultation

  const isPastConsultation = timeDifference > 1800000; // 30 minutes after the consultation
  const isWithinCancelWindow = consultationTime - currentTime > 86400000; // 24 hours

  // Formatting the consultation time to Egypt's local time (Africa/Cairo)
  const egyptTimeString = consultationTime.toLocaleTimeString("en-US", {
    timeZone: "Africa/Cairo",
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  return (
    <div dir="rtl" className="gap-4 border p-5 m-3 bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 rounded-lg flex-col md:flex-row items-center flex">
      <div className="flex flex-col gap-2 w-full">
        <h2 className="tajawal-bold flex items-center justify-between text-[18px]">
          {displayName}
        </h2>
        {role !== "Doctor" && (
          <h2 className="tajawal-regular flex gap-2">
            <ClipboardPlus className="h-5 w-5 text-primary" /> {doctor?.headLine || "Specialization not available"}
          </h2>
        )}
        {role === "Doctor" && (
          <h2 className="tajawal-regular flex gap-2">
            <ClipboardPlus className="h-5 w-5 text-primary" /> {consultation.freeConsultation ? "free consultation" : "paid consultation"}
          </h2>
        )}
        <h2 className="tajawal-regular flex gap-2">
          <Calendar className="h-5 w-5 text-primary" /> المعاد : {consultationTime.toLocaleDateString()}
        </h2>
        <h2 className="tajawal-regular flex gap-2">
          <Clock className="h-5 w-5 text-primary" /> الساعة : {egyptTimeString} بتوقيت مصر
        </h2>

        {role === "Doctor" && files.length > 0 && (
          <ConsultationFiles
            files={files}
            downloadLoading={downloadLoading}
            handleDownloadFile={handleDownloadFile}
          />
        )}
      </div>

      <ConsultationActions
        consultation={consultation}
        role={role}
        isPrevious={isPrevious}
        isWithinWindow={isWithinWindow}
        isPastConsultation={isPastConsultation}
        isWithinCancelWindow={isWithinCancelWindow}
        onShowNotes={() => onShowNotes(consultation)}
        onShowRatingModal={() => onShowRatingModal(consultation)}
        onCompleteConsultation={() => onCompleteConsultation(consultation)}
        onUpdateConsultation={onUpdateConsultation}
        onCancelConsultation={onCancelConsultation}  // Pass the function here
      />
    </div>
  );
};

export default ConsultationCard;
