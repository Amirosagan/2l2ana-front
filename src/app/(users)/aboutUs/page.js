import QuestionComponent from "@/src/components/FAQ/Question";
import MixFooter from "@/src/components/Footer/mixfooter";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import DoctoorBoster from "@/src/components/AboutUs/DoctoorBoster";
import GoalPage from "@/src/components/AboutUs/GoalPage";
import { BookOpenText, BookPlus } from "lucide-react";

export async function generateMetadata() {
  return {
    title: `من نحن | قلقانة`,
    description: `تعرف على منصة قلقانة، التي تهتم بكل ما يخص النساء في الوطن العربي، بما في ذلك التوعية الطبية، استشارات طبية، واحتياجات النساء. استكشف هدفنا وخدماتنا.`,
    keywords: "منصة نسائية, صحة النساء, استشارات طبية, توعية صحية, احتياجات النساء, خدمات طبية, معلومات طبية, قلقانة",
    author: "قلقانة",
    openGraph: {
      title: `من نحن | قلقانة`,
      description: `تعرف على منصة قلقانة، التي تهتم بكل ما يخص النساء في الوطن العربي، بما في ذلك التوعية الطبية، استشارات طبية، واحتياجات النساء. استكشف هدفنا وخدماتنا.`,
      type: 'website',
      url: `https://2l2ana.com/about-us`,
      images: [
        {
          url: 'https://2l2ana.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile-imgr.9825690a.png&w=1080&q=75',
          width: 800,
          height: 600,
          alt: 'من نحن - قلقانة',
        },
      ],
    },
  };
}

const AboutUsPage = () => {
  // const [openQuestionIndex, setOpenQuestionIndex] = useState(0);

  // const questions = [
  //   {
  //     question: "لماذا يعيش السمك في الماء ؟",
  //     answer: "Sed sapien netus phasellus suspendisse pellentesque nibh. Vestibulum eu cras class massa commodo. Quam molestie etiam magnis tellus hac habitasse porta."
  //   },
  //   {
  //     question: "لماذا اليوم هو الثلاثاء ؟",
  //     answer: "Sed sapien netus phasellus suspendisse pellentesque nibh. Vestibulum eu cras class massa commodo. Quam molestie etiam magnis tellus hac habitasse porta."
  //   },
  //   {
  //     question: "لماذا نحن هناااا ؟",
  //     answer: "Sed sapien netus phasellus suspendisse pellentesque nibh. Vestibulum eu cras class massa commodo. Quam molestie etiam magnis tellus hac habitasse porta."
  //   },
  //   {
  //     question: " سؤال يروادنا ",
  //     answer: "انا مش عارفني انا توهت مني انا مش اناااااااااا انا بتقطع من جوايا ونسيت طعم الفرحه اه وانتي يدنيا مش فيقالي "
  //   },
  //   {
  //     question: " سؤال يروادنا ",
  //     answer: "انا مش عارفني انا توهت مني انا مش اناااااااااا انا بتقطع من جوايا ونسيت طعم الفرحه اه وانتي يدنيا مش فيقالي "
  //   },
  // ];

  return (
    <main className="pt-10 m-auto">
      <GoalPage/>

      {/* <div className="md:w-[75%] w-[95%] m-auto">
        <div className="mt-32">
          <div className="flex flex-col md:flex-row ">
            <div className="md:w-[40%]  flex flex-col md:gap-2 gap-1">
              <h1 className=" text-accent tajawal-light md:text-2xl text-xl "> أهم الاسئلة </h1>
              <h1 className=" md:text-[56px] text-[36px] tajawal-bold  "> الأسئلة الشائعة</h1>
              <p className="pb-8" >  لبسي بشبش بششسب شسبسبسش تمنيبشسبشينكبمشيشبينمكبكشسمنسشبنمكبسشكنبش </p>
               </div>
            <div className="md:w-[55%] flex flex-col gap-3">
              {questions.map((q, index) => (
                <QuestionComponent
                  key={index}
                  question={q.question}
                  answer={q.answer}
                  isOpen={openQuestionIndex === index}
                  onClick={() => setOpenQuestionIndex(openQuestionIndex === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </div> */}
        
        
      {/* </div> */}

    </main>
  );
};

export default AboutUsPage;
