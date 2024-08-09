import { BookOpenText } from 'lucide-react';
import Image from 'next/image';


const ServicesPage = () => {
    return ( 
        <div className="services flex flex-col   items-center mt-48 gap-4">
     

        <div className="flex flex-col md:flex-row w-full justify-center "> 

          
            
           
        <div className="w-full bg-neutral-200 ml-[1px] md:w-[25%] relative top-96 p-4 pb-10 mt-40 h-full border-2 "> 
          <div className=" mx-6 flex flex-col  items-center">  
          <h1 style={{color:"rgb(52 146 150)"}} className="text-center py-5 text-2xl tajawal-bold"> 
             التوعية والاستشارات الطبية 

          </h1>
          <p  className="tajawal-medium text-lg "> قسم التوعية والاستشارات الطبية الخاصة بالنساء بمختلف مراحلهن العمرية و التي تهدف إلى تعزيز وعى البنات والسيدات حول كل ما يخص صحتهن النفسية والجسدية والمساعدة في شعورهن بالأمان والاطمئنان. </p>
         
          </div>

    
        </div>


        <div className="w-full bg-neutral-200 ml-[1px] relative top-20 p-4 pb-10 md:w-[25%]  h-full border-2 "> 
        {/* <Image  className=" absolute hidden md:flex   w-40 " alt="girl" src={girl}/> */}

          <div className="mx-6  flex flex-col items-center ">  
          <h1 style={{color:"rgb(52 146 150)"}} className="text-center py-5 text-2xl tajawal-bold"> 
              احتياجات النساء
          </h1>
          <p  className="tajawal-medium text-lg "> قسم احتياجات النساء ونقوم من خلاله بتوفير جميع المنتجات التي تحتاجها النساء لتصبح في مكان واحد ويمكن الحصول عليها بكل سهولة ويسر </p>
           <button style={{color:"white"}} className=" p-4 tajawal-bold px-7  flex mt-16  text-bold bg-slate-500">   متوفر قريبا   </button>
           
          </div>
    
        </div>
          </div>
          </div>
     );
}
 
export default ServicesPage;