import CategoriesClient from './client';

export async function generateMetadata() {
  const categoryInfo = "فيديوهات, مقالات, محتوى جديد, اكتشف محتوى, موقعنا"; 

  return {
    metadataBase: new URL('https://mettamena.com'),
    title: `المحتوى الطبي | متطمنة`,
    description: `اكتشف أفضل الفيديوهات والمقالات على موقعنا. تشمل القائمة: ${categoryInfo}.`,
    keywords: "فيديوهات, مقالات, محتوى جديد, اكتشف محتوى, متطمنة",
    author: "متطمنة",
    openGraph: {
      title: `اكتشف محتوى طبي مميز | متطمنة`,
      description: `اكتشف أفضل الفيديوهات والمقالات على موقعنا. تشمل القائمة: ${categoryInfo}.`,
      type: 'website',
      url: `https://mettamena.com/categories`,
      images: [
        {
          url: 'https://mettamena.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcontent-image.abc123.png&w=1080&q=75', 
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
