import { Button } from "@/components/ui/button";
import { Star, StarIcon, StarOff } from "lucide-react";
import Image from "next/image";
import BookAppointment from "./BookAppointment";

const DoctorItem = ({ doctor }) => {
    const { name, specialty, description, fee, imageUrl, rating, new: isNew } = doctor;

    return (
        <div className="w-full p-7 md:rounded-2xl mt-4 bg-white border-black border-2">
            <div className="flex flex-row justify-between gap-2">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-10">
                        <h1 className="">
                            <Image alt='face-photo' className='w-[100px] rounded-full' src={imageUrl} width={100} height={100} />
                        </h1>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <h1 className='tajawal-extrabold text-lg text-accent'>{name}</h1>
                                <p className='tajawal-medium text-slate-500'>{specialty}</p>
                                <span className='tajawal-medium mt-2 mb-1 flex' style={{color:"rgb(254 214 0)"}}>
                                    {Array.from({ length: rating }, (_, i) => <Image alt='face-photo'  src='/star.png' width={24} height={24} key={i} />)}
                                    {Array.from({ length: 5 - rating }, (_, i) => <Star className=" h-6"  key={i} />)}
                                </span>
                                {isNew && <h5 className='tajawal-medium text-slate-500'>انضم حديثا</h5>}
                            </div>
                        </div>
                    </div>
                    <div className="bg-white mx-3 mt-3 tajawal-medium text-slate-500 text-sm flex flex-col gap-2">
                        <h1 className="w-[85%] text-accent">{description}</h1>
                        <p className="">الكشف: {fee}</p>
                       

                    </div>
                    
                </div>
                <div className="flex flex-row gap-2 items-center"> 
               
                <Button className="bg-neutral-200 mt-3 md:p-6 flex items-center w-40 h-32 text-accent text-base">احجز الأن</Button>
                <Button variant="outline" className=" mt-3 md:p-6 border-neutral-200 flex items-center w-40 h-32  text-black text-base">تجربة مجانية</Button>
                </div>

            </div>
        </div>
    );
}

export default DoctorItem;
