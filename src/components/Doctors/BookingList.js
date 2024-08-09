import Image from "next/image";
import { Calendar, ClipboardPlus, Clock } from "lucide-react";

const BookingList = ({ consultations, doctorDetails }) => {
    return (
        <div>
            {consultations.map((consultation) => {
                const doctor = doctorDetails[consultation.doctorId];
                return (
                    <div key={consultation.id} className="gap-4 border p-5 m-3 bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 rounded-lg  flex-col md:flex-row items-center flex">
                        <Image
                            alt="doctor"
                            src={doctor?.imageUrl || "/noavatar.png"} 
                            className="rounded-full border hidden md:block border-black mb-1 object-cover h-[70px] w-[70px]"
                            width={70}
                            height={70}
                        />
                        <div className="flex flex-col gap-2 w-full">
                            <h2 className="tajawal-bold flex items-center justify-between text-[18px]"> {doctor?.name || "Unknown Doctor"} </h2>
                            <h2 className="tajawal-regular flex gap-2 text-gray-500">
                                <ClipboardPlus className="h-5 w-5 text-primary" /> {doctor?.headLine || "Specialization not available"}
                            </h2>
                            <h2 className="tajawal-regular flex gap-2">
                                <Calendar className="h-5 w-5 text-primary" /> المعاد : {new Date(consultation.date).toLocaleDateString()}
                            </h2>
                            <h2 className="tajawal-regular flex gap-2">
                                <Clock className="h-5 w-5 text-primary" />الساعة : {new Date(consultation.date).toLocaleTimeString()}
                            </h2>
                        </div>
                        <button className="bg-primary text-white py-3 shadow-lg tajawal-regular hover:scale-105 transition-all duration-200 rounded-md w-[200px]" as="a" href={consultation.meetingUrl} target="_blank" rel="noopener noreferrer">
                            Join Meeting
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default BookingList;
