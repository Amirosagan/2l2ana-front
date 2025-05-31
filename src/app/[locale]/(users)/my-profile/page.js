import dynamic from "next/dynamic";

const MyProfileClient = dynamic(() => import("./client"), { ssr: false });

export async function generateMetadata() {
  return {
    metadataBase: new URL('https://mettamena.com'),
    title: `ملفي الشخصي | متطمنة`,
    description: `إدارة حسابك الشخصي والاطلاع على الحجوزات والمعلومات الطبية.`,
    keywords:
      "ملفي الشخصي, إدارة الحساب, معلومات طبية, حجز استشارة طبية, طبيب اونلاين",
    author: "متطمنة",
    openGraph: {
      title: `ملفي الشخصي | متطمنة`,
      description: `إدارة حسابك الشخصي والاطلاع على الحجوزات والمعلومات الطبية.`,
      type: "website",
      url: `https://mettamena.com/myprofile`,
      images: [
        {
          url: "https://mettamena.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile-image.abc123.png&w=1080&q=75",
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
