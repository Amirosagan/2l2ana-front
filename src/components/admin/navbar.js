"use client"
import { Bell, Earth, MessageCircle, Search } from "lucide-react";
import { usePathname } from "next/navigation";

const Navbar = () => {
const Pathname = usePathname(); 


    return ( 
    
    
    <div className="flex p-3 bg-admin1 justify-between  rounded-md items-center"> 
        <div  className="font-bold text-admin2 capitalize px-10"> {Pathname.split("/").pop()} 
             
        </div>
        <div className="flex gap-6 px-10">
             <div className="flex bg-white gap-3 p-2 rounded-lg items-center"><Search/>
             
              <input type="text" placeholder="search..." className=" h-8 border-none "/>
         </div> 
         
         <div className="flex items-center gap-3 text-admin2"> <MessageCircle size={20}/> <Bell size={20}/><Earth size={20} /> </div>
         </div> 

         </div> );
}
 
export default Navbar;