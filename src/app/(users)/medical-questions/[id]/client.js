"use client";
import { useEffect, useState } from "react";
import api from "@/src/utils/api";
import SuggestionList from "@/src/components/Doctors/DoctorSuggestionList";
import Link from "next/link";

const SingleMedicalQuestion = ({ initialQuestion, questionId }) => {
  const [question, setQuestion] = useState(initialQuestion);
  const [loading, setLoading] = useState(!initialQuestion);
  const [relatedQuestions, setRelatedQuestions] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedQuestions = async () => {
      try {
        if (question.tags && question.tags.length > 0) {
          const tagsQuery = question.tags.map(tag => tag.name).join(',');
          const relatedResponse = await api.get(`/Question?tags=${tagsQuery}&limit=3`);
          setRelatedQuestions(relatedResponse.data.items.slice(0, 3));
        } else {
          const relatedResponse = await api.get('/Question?limit=3');
          setRelatedQuestions(relatedResponse.data.items.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching related questions:', error);
      } finally {
        setRelatedLoading(false);
      }
    };

    if (question) {
      fetchRelatedQuestions();
    } else {
      const fetchQuestion = async () => {
        try {
          const questionResponse = await api.get(`/Question/${questionId}`);
          setQuestion(questionResponse.data.question);
          setLoading(false);
          fetchRelatedQuestions();
        } catch (error) {
          console.error('Error fetching question:', error);
          setLoading(false);
          setRelatedLoading(false);
        }
      };

      fetchQuestion();
    }
  }, [question, questionId]);

  if (loading) {
    return (
      <div className="lg:mt-20 flex flex-col lg:flex-row justify-between mx-2 sm:mx-10 lg:mx-40">
        <div className="w-full">
          <div className="p-4 mb-10 bg-neutral-100 animate-pulse">
            <div className="flex justify-between w-full tajawal-medium text-gray-500 text-[13px]">
              <div className="bg-gray-300 h-6 w-1/4 mb-2 rounded"></div>
              <div className="bg-gray-300 h-6 w-1/4 mb-2 rounded"></div>
            </div>
            <div className="bg-gray-300 h-8 w-3/4 mt-6 mb-2 rounded"></div>
            <div className="bg-gray-300 h-4 w-full mt-6 mb-2 rounded"></div>
            <div className="bg-gray-300 h-4 w-full mt-2 mb-2 rounded"></div>
            <div className="bg-gray-300 h-4 w-5/6 mt-2 mb-2 rounded"></div>
            <div className="bg-gray-300 h-4 w-3/4 mt-2 mb-2 rounded"></div>
            <div className="bg-gray-300 h-4 w-2/3 mt-2 mb-2 rounded"></div>
            <div className="py-4 px-2 border-t-2 border-primary mt-10">
              <div className="bg-gray-300 h-6 w-1/3 mt-4 mb-2 rounded"></div>
              <div className="bg-gray-300 h-4 w-full mt-5 mb-2 rounded"></div>
              <div className="bg-gray-300 h-4 w-5/6 mt-2 mb-2 rounded"></div>
              <div className="bg-gray-300 h-4 w-4/6 mt-2 mb-2 rounded"></div>
            </div>
            <div className="bg-gray-300 h-10 w-full mt-5 rounded"></div>
          </div>
          <div className="bg-neutral-100 animate-pulse p-5 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gray-300 h-6 w-1/3 rounded"></div>
              <div className="bg-gray-300 h-6 w-1/6 rounded"></div>
            </div>
            <div className="bg-gray-300 h-4 w-full mb-2 rounded"></div>
            <div className="bg-gray-300 h-4 w-5/6 mb-2 rounded"></div>
            <div className="bg-gray-300 h-4 w-4/6 mb-2 rounded"></div>
            <div className="bg-gray-300 h-4 w-3/6 mb-2 rounded"></div>
            <div className="bg-gray-300 h-4 w-2/6 mb-2 rounded"></div>
          </div>
        </div>
        <div className="w-full lg:min-w-[30%] lg:max-w-[30%] sticky top-0">
          <SuggestionList />
        </div>
      </div>
    );
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
            هل تريد اجابة اكثر تفصيلا، <Link href="/booking-Doctor" className="tajawal-bold cursor-pointer underline">مكالمة فيديو مع طبيب الأن؟</Link>
          </h1>
        </div>
        <div className="">
          <div className="flex items-center justify-between mb-4 mx-4">
            <h2 className="tajawal-regular text-lg text-primary">أسئلة ذات صلة</h2>
            <Link href="/medical-questions" className="text-accent text-lg underline tajawal-regular">
              المزيد
            </Link>
          </div>
          {relatedLoading ? (
            <p>Loading related questions...</p>
          ) : (
            relatedQuestions.length > 0 ? relatedQuestions.map(relatedQuestion => (
              <div key={relatedQuestion.id} className="mb-4 bg-neutral-100 p-5 items-center flex justify-between">
              <div>
                <h1 className="text-md text-lg">{relatedQuestion.title}</h1>
                <p className="text-gray-600">{relatedQuestion.content}</p>
              </div>
              <Link href={`/medical-questions/${relatedQuestion.id}`}>
                <button className="bg-primary/70 hover:bg-primary text-white px-4 py-2 rounded">شوف الاجابة</button>
              </Link>
            </div>
          )) : <p>No related questions found.</p>
        )}
      </div>
    </div>
    <div className="w-full lg:min-w-[30%] lg:max-w-[30%] sticky top-0">
      <SuggestionList />
    </div>
  </div>
);
};

export default SingleMedicalQuestion;
