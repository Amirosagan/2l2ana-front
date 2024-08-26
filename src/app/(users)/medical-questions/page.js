import QuestionAnswers from "./client";
import api from "@/src/utils/api";

export async function generateMetadata() {
  const res = await api.get('/Question');
  const data = res.data;

  const titles = data.items.map(question => question.title).join(', ');

  return {
    metadataBase: new URL('https://2l2ana.com'),
    title: `اسئلة طبية | قلقانة`,
    description: `احصل على إجابات لأسئلتك الطبية. قدم استفساراتك واحصل على نصائح مهنية عبر الإنترنت. تشمل المواضيع: ${titles}.`,
    keywords: "حجز دكتور, اسئلة طبية, استشارة طبية, نصائح طبية, استفسارات صحية, دكتور اونلاين, دكتور عبر الإنترنت, حجز استشارة طبية, سؤال طبي, طبيب استشاري, نصيحة طبية, استفسار طبي, حجز موعد مع دكتور, استشارة دكتور, نصائح صحية, طبيب متخصص, استفسارات طبية شائعة, book doctor, medical questions, doctor consultation, medical advice, health queries, online doctor, doctor appointment, medical consultation, ask doctor, professional medical advice",
    author: "قلقانة",
    openGraph: {
      title: `اسئلة طبية | قلقانة`,
      description: `احصل على إجابات لأسئلتك الطبية. قدم استفساراتك واحصل على نصائح مهنية عبر الإنترنت. تشمل المواضيع: ${titles}.`,
      type: 'website',
      url: `https://2l2ana.com/questions`,
      images: [
        {
          url: 'https://2l2ana.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile-imgr.9825690a.png&w=1080&q=75', 
          width: 800,
          height: 600,
          alt: 'اسئلة طبية',
        },
      ],
    },
  };
}

export default function Page() {
  return <QuestionAnswers />;
}
