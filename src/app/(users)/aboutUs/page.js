import GoalPage from "@/src/components/AboutUs/GoalPage";

export async function generateMetadata() {
  return {
    metadataBase: new URL('https://2l2ana.com'),
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
  return (
    <main className="pt-10 m-auto">
      <GoalPage/>

   

    </main>
  );
};

export default AboutUsPage;
