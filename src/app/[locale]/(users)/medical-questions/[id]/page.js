import api from '@/src/utils/api';
import SuggestionList from "@/src/components/Doctors/DoctorSuggestionList";
import { Link } from '@/src/i18n/routing';

export async function generateMetadata({ params }) {
  const { id } = params;

  try {
    const res = await api.get(`/Question/${id}`);
    const question = res.data.question;

    return {
      metadataBase: new URL('https://mettamena.com'),
      title: `${question.title} | متطمنة`,
      description: question.content.slice(0, 150) + '...',
      keywords: "مدونة طبية, نصائح طبية, استشارات طبية, صحة, صحة عامة, نصائح صحية, حجز طبيب, مدونة طبية عربية, Medical blog, Medical tips, Medical consultations, Health, General health, Health tips, Book a doctor, Arabic medical blog",
      author: "متطمنة",
      openGraph: {
        title: `${question.title} | متطمنة`,
        description: question.content.slice(0, 150) + '...',
        type: 'article',
        url: `https://mettamena.com/medical-questions/${id}`,
        images: [
          {
            url: question.imageUrl,
            width: 800,
            height: 600,
            alt: question.title,
          },
        ],
      },
    };
  } catch (error) {
    console.error('Error fetching question metadata:', error);
    return {
      title: 'Error | متطمنة',
      description: 'Error fetching question data',
    };
  }
}

const QuestionPage = async ({ params }) => {
  const { id } = params;

  let question = null;
  let relatedQuestions = [];

  try {
    const response = await api.get(`/Question/${id}`);
    question = response.data.question;

    if (question.tags && question.tags.length > 0) {
      const tagsQuery = question.tags.map(tag => tag.name).join(',');
      const relatedResponse = await api.get(`/Question?tags=${tagsQuery}&limit=3`);
      relatedQuestions = relatedResponse.data.items.slice(0, 3);
    } else {
      const relatedResponse = await api.get('/Question?limit=3');
      relatedQuestions = relatedResponse.data.items.slice(0, 3);
    }
  } catch (error) {
    console.error('Error fetching question data:', error);
    return <div>Error fetching question data</div>;
  }

  if (!question) {
    return <div>Question not found</div>;
  }

  const tag = question.tags && question.tags.length > 0 ? question.tags[0].name : "استشارات طبية";
  const doctorAnswer = question.comments && question.comments.length > 0 ? question.comments[0].content : "لا توجد إجابة بعد.";

  return (
    <div className="lg:mt-20 flex flex-col lg:flex-row justify-between mx-2 sm:mx-10 lg:mx-40">
      <div className="w-full">
        <div className="p-4 mb-10 bg-neutral-100">
          <div className="flex justify-between w-full tajawal-medium text-gray-500 text-[13px]">
            <h5>{tag}</h5>
            <h2>{new Date(question.date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</h2>
          </div>
          <h1 className="mt-6 text-2xl mx-2">{question.title}</h1>
          <p className="mt-6 text-gray-600 mx-5">{question.content}</p>
          <div className="py-4 px-2 border-t-2 border-primary mt-10">
            <h1 className="text-lg mt-4">اجابة الطبيب:</h1>
            <p className="text-gray-500 mt-5 text-[16px]">{doctorAnswer}</p>
          </div>
          <h1 className="bg-primary/80 mx-2 text-center rounded-sm px-5 py-3 text-white mt-5 tajawal-regular">
            هل تريدي اجابة اكثر تفصيلا، <Link href="/booking-Doctor" className="tajawal-bold cursor-pointer underline">مكالمة فيديو مع طبيب الأن؟</Link>
          </h1>
        </div>
        <div className="">
          <div className="flex items-center justify-between mb-4 mx-4">
            <h2 className="tajawal-regular text-lg text-primary">أسئلة ذات صلة</h2>
            <Link href="/medical-questions" className="text-accent text-lg underline tajawal-regular">
              المزيد
            </Link>
          </div>
          {relatedQuestions.length > 0 ? relatedQuestions.map(relatedQuestion => (
            <div key={relatedQuestion.id} className="mb-4 bg-neutral-100 p-5 items-center flex-col md:flex-row flex justify-between">
              <div>
                <h1 className="text-md text-lg">{relatedQuestion.title}</h1>
                <p className="text-gray-600">{relatedQuestion.content}</p>
              </div>
              <Link className='w-full md:w-fit  md:mt-0 mt-5' href={`/medical-questions/${relatedQuestion.id}`}>
                <button className="bg-primary/70 hover:bg-primary text-white w-full px-4 py-2  rounded">شوفي الاجابة</button>
              </Link>
            </div>
          )) : <p>No related questions found.</p>}
        </div>
      </div>
      <div className="w-full lg:min-w-[30%] lg:max-w-[30%] sticky top-0">
        <SuggestionList />
      </div>
    </div>
  );
};

export default QuestionPage;
