import SuggestionList from "@/src/components/Doctors/DoctorSuggestionList";
import HeroQestion from "@/src/components/Questions/HeroQestions";
import Questions from "@/src/components/Questions/Qestions";
import ScrollButton from "@/src/components/Questions/ScrollButton";
import api from "@/src/utils/api";

export async function generateMetadata() {
  try {
    const res = await api.get('/Question', {
      cache: 'no-cache'  
    });
    const data = res.data;

    const titles = data.items.map(question => question.title).join(', ');

    return {
      metadataBase: new URL('https://mettamena.com'),
      title: `اسئلة طبية | متطمنة`,
      description: `احصل على إجابات لأسئلتك الطبية. قدم استفساراتك واحصل على نصائح مهنية عبر الإنترنت. تشمل المواضيع: ${titles}.`,
      keywords: "حجز دكتور, اسئلة طبية, استشارة طبية, نصائح طبية, استفسارات صحية, دكتور اونلاين, دكتور عبر الإنترنت, حجز استشارة طبية, سؤال طبي, طبيب استشاري, نصيحة طبية, استفسار طبي, حجز موعد مع دكتور, استشارة دكتور, نصائح صحية, طبيب متخصص, استفسارات طبية شائعة, book doctor, medical questions, doctor consultation, medical advice, health queries, online doctor, doctor appointment, medical consultation, ask doctor, professional medical advice",
      author: "متطمنة",
      openGraph: {
        title: `اسئلة طبية | متطمنة`,
        description: `احصل على إجابات لأسئلتك الطبية. قدم استفساراتك واحصل على نصائح مهنية عبر الإنترنت. تشمل المواضيع: ${titles}.`,
        type: 'website',
        url: `https://mettamena.com/questions`,
        images: [
          {
            url: 'https://mettamena.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile-imgr.9825690a.png&w=1080&q=75', 
            width: 800,
            height: 600,
            alt: 'اسئلة طبية',
          },
        ],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: "Error | متطمنة",
      description: "Error generating metadata",
    };
  }
}

export default async function QuestionAnswersPage() {
  let questions = [];

  try {
    const response = await api.get('/Question', {
      cache: 'no-cache' 
    });
    questions = response.data.items;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return (
    <>
      <HeroQestion />
      <ScrollButton />
      <div className="flex flex-col justify-between mx-[4%] lg:mx-20 mt-10 md:mt-28 gap-20 lg:gap-2 lg:flex-row" dir="rtl">
        <div className="w-full">
          <Questions filteredQuestions={questions} />
        </div>
        <div className='sticky lg:max-w-[30%] top-40 lg:h-[calc(100vh-40px)] md:min-w-[370px]'>
          <SuggestionList blog={true} />
        </div>
      </div>
    </>
  );
}
