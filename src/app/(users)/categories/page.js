import CategoriesClient from './client';

export async function generateMetadata() {
  const categoryInfo = "فيديوهات, مقالات, محتوى جديد, اكتشف محتوى, موقعنا"; // Static metadata

  return {
    metadataBase: new URL('https://2l2ana.com'),
    title: `المحتوى الطبي | قلقانة`,
    description: `اكتشف أفضل الفيديوهات والمقالات على موقعنا. تشمل القائمة: ${categoryInfo}.`,
    keywords: "فيديوهات, مقالات, محتوى جديد, اكتشف محتوى, قلقانة",
    author: "قلقانة",
    openGraph: {
      title: `اكتشف محتوى طبي مميز | قلقانة`,
      description: `اكتشف أفضل الفيديوهات والمقالات على موقعنا. تشمل القائمة: ${categoryInfo}.`,
      type: 'website',
      url: `https://2l2ana.com/categories`,
      images: [
        {
          url: 'https://2l2ana.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcontent-image.abc123.png&w=1080&q=75', 
          width: 800,
          height: 600,
          alt: 'محتوي طبي',
        },
      ],
    },
  };
}

const CategoriesPage = () => {
  return (
    <CategoriesClient />
  );
};

export default CategoriesPage;
