import Image from "next/image";
import { Link } from '@/src/i18n/routing';
import question from '@/public/question.jpg';
import { useTranslations } from 'next-intl';

const ArticleCard = () => {
  const t = useTranslations('ArticleCard'); 

  return (
    <div className="overflow-hidden rounded-lg w-[88%] lg:w-[75%] md:w-[100%] lg:mb-20 my-10 md:mb-10 m-auto bg-neutral-100 flex justify-between items-center flex-col lg:flex-row">
      <div className="flex flex-col gap-4 px-4 py-8">
        <h1 className="text-3xl text-gray-800 tajawal-bold sm:text-3xl text-center mb-5 md:mb-10">
          {t('title')}
        </h1>

        <div className="w-[80%] m-auto flex flex-col items-center text-center tajawal-regular gap-4">
          <Link href="/medical-questions" className="w-full">
            <div style={{ backgroundColor: "rgb(16 42 79)" }} className="block rounded bg-secondary px-8 py-3 text-sm font-medium text-white shadow focus:outline-none focus:ring active:bg-secondary">
              {t('seeQuestions')}
            </div>
          </Link>
          <Link href="/ask-Doctor" className="w-full">
            <div className="block rounded bg-white px-8 py-3 text-sm font-medium text-black shadow focus:outline-none focus:ring active:bg-white">
              {t('askQuestion')}
            </div>
          </Link>
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center h-full min-w-[300px]">
        <Image src={question} alt="Question" className="object-cover hidden lg:block w-full h-full max-w-[700px] min-w-[300px]" />
      </div>
    </div>
  );
};

export default ArticleCard;
