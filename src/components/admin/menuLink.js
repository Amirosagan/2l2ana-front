'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";



const MneuLink = ({item}) => {

    const Pathname = usePathname() 

    return ( 
    <div   className={`${ " lhover  py-2 my-1  rounded-lg shadow-lg  border-solid border-black " } ${Pathname.includes(item.path) && "active"}
` }> 
    <Link  className={`${ "flex  text-admin2 rounded-lg gap-3  p-3 " } ` }href={item.path}> 
     {item.icon}
     {item.title}
    </Link> 
    </div>);
}
 
export default MneuLink;