import Image from "next/image";
import DoctorImage from '@/public/Doctooor.jpg'
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DoctoorBoster = () => {
    return (  
        <div id="ad" style={{ backgroundColor: "rgb(52, 146, 150)" }} className="md:mt-40 mt-10 flex flex-col md:flex-row"> 
            <div className="w-full flex flex-col p-10  justify-center"> 
                <div className="flex flex-col justify-center md:gap-10"> 
                    <div className="flex flex-col justify-center "> 
                        <div className=" "> 
                            <h1 className="md:text-[36px]  xl:w-[79%] text-white  text-[23px] tajawal-bold">
                                استشارتك اونلاين مع اشطر دكتور في مصر
                            </h1>
                            {/* <Image className="w-[60%] relative -top-44 right-28 md:hidden xl:w-[520px] lg:h-full overflow-hidden" alt="Doctor" src={DoctorBosterr} />   */}
                        </div>
                    </div>
                    <Link href="booking-Doctor" className="flex justify-end mt-5  xl:mt-10 md:justify-center lg:justify-end">
                        <Button className="bg-accent w-full md:w-fit py-7  text-xl tajawal-bold px-3 flex text-white">شوف الدكاترة</Button>
                    </Link>
                </div>
            </div>
            <div className="w-full hidden md:flex xl:w-[500px] lg:h-full overflow-hidden">
                <Image className="overflow-hidden w-full" alt="Doctor" src={DoctorImage} />
            </div>
        </div>
    );
};

export default DoctoorBoster;
