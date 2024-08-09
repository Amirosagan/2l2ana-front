import WomenImage from '@/public/women.jpg';
import Image from 'next/image';

const GoalPage = () => {
    return (
        <div className="flex flex-col lg:flex-row md:w-2/3 mx-5 justify-center items-center md:m-auto m-auto p-10  border-2 border-primary rounded-lg bg-neutral-50">
            <div className="flex flex-col gap-10 md:w-1/2">
                <h1 className="tajawal-bold text-5xl text-primary">من نحن؟</h1>
                <p className="tajawal-regular text-xl">
                    منصة تهتم بكل ما يخص النساء في جميع أنحاء الوطن العربي. تنقسم داخلها الخدمات إلى:
                </p>
                <ul className="tajawal-regular text-lg list-disc ml-5">
                    <li className="text-primary ">
                        قسم التوعية والاستشارات الطبية الخاصة بالنساء بمختلف مراحلهن العمرية والتي تهدف إلى تعزيز وعي البنات والسيدات حول كل ما يخص صحتهن النفسية والجسدية والمساعدة في شعورهن بالأمان والاطمئنان.
                    </li>
                    <li className="text-primary mt-4">
                        قسم احتياجات النساء ونقوم من خلاله بتوفير جميع المنتجات التي تحتاجها النساء لتصبح في مكان واحد ويمكن الحصول عليها بكل سهولة ويسر.
                    </li>
                </ul>
                <div>
                    <h2 className="tajawal-bold text-4xl mt-8 text-primary">هدفنا</h2>
                    <p className="tajawal-regular text-xl mt-2">
                        أن نصبح المكان الأول الذي تلجأ إليه النساء عندما يجول ببالها سؤال ما عن صحتها أو تحتاج منتج يخصها.
                    </p>
                </div>
            </div>
            <div className="lg:w-1/2 md:w-[90%] w-[100%]  flex justify-center items-center mt-12 lg:mt-0">
                <Image className="object-cover rounded-xl" alt="Our Goal" src={WomenImage} />
            </div>
        </div>
    );
}

export default GoalPage;
