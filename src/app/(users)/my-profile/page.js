import dynamic from "next/dynamic";

const MyProfileClient = dynamic(() => import("./client"), { ssr: false });

export async function generateMetadata() {
  return {
    metadataBase: new URL('https://2l2ana.com'),
    title: `ملفي الشخصي | قلقانة`,
    description: `إدارة حسابك الشخصي والاطلاع على الحجوزات والمعلومات الطبية.`,
    keywords:
      "ملفي الشخصي, إدارة الحساب, معلومات طبية, حجز استشارة طبية, طبيب اونلاين",
    author: "قلقانة",
    openGraph: {
      title: `ملفي الشخصي | قلقانة`,
      description: `إدارة حسابك الشخصي والاطلاع على الحجوزات والمعلومات الطبية.`,
      type: "website",
      url: `https://2l2ana.com/myprofile`,
      images: [
        {
          url: "https://2l2ana.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile-image.abc123.png&w=1080&q=75",
          width: 800,
          height: 600,
          alt: "ملفي الشخصي",
        },
      ],
    },
  };
}

const MyProfilePage = () => {
  return <MyProfileClient />;
};

export default MyProfilePage;
