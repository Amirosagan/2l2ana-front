import { Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import profileImg from '@/public/profile-imgr.png'
import Image from "next/image";

const Footer = () => {
    return ( 

        
        <div className="px-5 pt-16 lg:pt-0 "> 
        <div className="flex justify-between gap-16 items-center  flex-col md:flex-row w-full md:w-[90%] lg:w-[75%] m-auto">

        <div className="flex flex-col md:flex-row gap-16 md:gap-24 justify-around "> 
             <div> <h1 className="tajawal-bold text-xl"> احجز اشطر دكتور </h1>  <div> 

                 <div className="flex tajawal-medium gap-2 pt-4 flex-col ">
                      <Link href="booking-Doctor" className="hover:text-accent"> دكتور نسا وتوليد </Link>
                      <Link href="booking-Doctor" className="hover:text-accent"> اخصائي علم نفس </Link>
                      <Link href="booking-Doctor" className="hover:text-accent"> دكتور ادمان وامراض نفسية</Link>
                      <Link href="booking-Doctor" className="hover:text-accent"> المزيد من التخصصات</Link>
                 </div>
             </div>
                 
             </div>
             <div> <h1 className="tajawal-bold text-xl"> تابعنا </h1>  <div> 

                 <div className="flex tajawal-medium gap-2 pt-4">
                      <Link href="/" className=""> <Facebook className="bg-accent w-8 h-8 p-1 hover:scale-125 transition-all ease duration-200   text-white"/> </Link>
                      <Link href="/" className=""> <Instagram className="bg-accent w-8 h-8 p-1  hover:scale-125 transition-all ease duration-200  text-white"/> </Link>
                      <Link href="/" className=""> <Youtube className="bg-accent w-8 h-8 p-1 hover:scale-125 transition-all ease duration-200  text-white"/> </Link>

                 </div>
             </div>
                 
             </div>
             <div> <h1 className="tajawal-bold text-xl"> خدماتنا </h1>  <div> 

                 <div className="flex tajawal-medium gap-2 pt-4 flex-col">
                      <Link href="/blogs" className="hover:text-accent">  مقالات طبية </Link>
                      <Link href="/videos" className="hover:text-accent"> فيديوهات طبية </Link>
                      <Link href="/medical-questions" className="hover:text-accent">  اسئلة طبية </Link>
                      <Link href="/ask-Doctor" className="hover:text-accent"> اسألنا ؟ </Link>
                      <Link href="/aboutUs" className="hover:text-accent">  من نحن </Link>
                 </div>
             </div>
                 
             </div>
             
              </div>
              <Image className="w-[200px] pb-5" alt="Doctor" src={profileImg}/>  
        
     

        </div>
        <div className="w-full mt-8 relative font-medium pb-8 px-8 flex  flex-col md:flex-row items-center justify-center">
 <span className="text-center">
   &copy;2024 2l2ana. All rights reserved.
 </span>
 {/* <Link
   href="/sitemap.xml"
   className="text-center underline my-4 md:my-0"
 >
   sitemap.xml
 </Link> */}
 {/* <div className="text-center">
   Made with &hearts; by{" "}
   <a href="https://devdreaming.com" className="underline" target="_blank">
     CodeBucks
   </a>
 </div> */}
</div>
</div>
        
     );
}
 
export default Footer;