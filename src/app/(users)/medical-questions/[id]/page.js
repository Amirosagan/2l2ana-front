import api from '@/src/utils/api';
import SingleMedicalQuestion from './client';

export async function generateStaticParams() {
  const res = await api.get('/Question');
  const data = res.data.items;

  return data.map((question) => ({
    id: question.id, 
  }));
}

export async function generateMetadata({ params }) {
  const { id } = params;

  try {
    const res = await api.get(`/Question/${id}`);
    const question = res.data.question;

    return {
      metadataBase: new URL('https://2l2ana.com'),
      title: `${question.title} | قلقانة`,
      description: question.content.slice(0, 150) + '...',
      keywords: "مدونة طبية, نصائح طبية, استشارات طبية, صحة, صحة عامة, نصائح صحية, حجز طبيب, مدونة طبية عربية, Medical blog, Medical tips, Medical consultations, Health, General health, Health tips, Book a doctor, Arabic medical blog",
      author: "قلقانة",
      openGraph: {
        title: `${question.title} | قلقانة`,
        description: question.content.slice(0, 150) + '...',
        type: 'article',
        url: `https://2l2ana.com/medical-questions/${id}`,
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
      title: 'Error | قلقانة',
      description: 'Error fetching question data',
    };
  }
}

const QuestionPage = async ({ params }) => {
  const { id } = params;

  try {
    const response = await api.get(`/Question/${id}`);
    const question = response.data.question;

    return (
      <div>
        <SingleMedicalQuestion initialQuestion={question} questionId={id} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching question data:', error);
    return <div>Error fetching question data</div>;
  }
};

export default QuestionPage;
