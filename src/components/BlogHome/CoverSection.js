import Image from "next/image";
import { getTranslations } from 'next-intl/server'; // Use getTranslations for async translation
import { Link } from '@/src/i18n/routing';
import Tag from "@/src/components/ELements/Tag";
import api from "@/src/utils/api";

const CoverSection = async () => {
  const t = await getTranslations('CoverSection'); // Async translation function
  let blog = null;

  try {
    const response = await api.get("/Post?page=1&pageSize=1");
    const { items } = response.data;

    if (items.length > 0) {
      blog = items[0];
    }
  } catch (error) {
    console.error(t('errorLoadingBlog'), error); // Localized error message
  }

  if (!blog) {
    return <div>{t('errorLoadingBlog')}</div>; // Localized error message
  }

  return (
    <div className="w-full" dir="rtl">
      <h1 className="text-3xl mx-4 mb-5 mt-2 md:hidden" style={{ color: "rgb(92, 194, 198)" }}>
        {t('articles')} {/* Localized title */}
      </h1>
      <article className="flex flex-col items-start mx-5 lg:w-[90%] lg:m-auto justify-end relative md:h-[80vh]">
        <div className="absolute right-0 top-0 left-0 bottom-0 bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-3xl z-0"></div>
        {blog.imageUrl ? (
          <Image
            className="w-full h-full object-center object-cover rounded-3xl -z-10 border-4"
            alt={blog.title}
            src={blog.imageUrl}
            layout="fill"
            unoptimized={true}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-3xl -z-10 border-4 flex items-center justify-center">
            <span>{t('noImageAvailable')}</span> {/* Localized message for no image */}
          </div>
        )}
        <div className="w-3/4 p-16 flex flex-col items-start justify-center z-0 cursor-pointer text-light">
          <Tag name={blog.tags[0]?.name || t('uncategorized')} link="" />
          <Link href={`/blogs/${blog.id}`} className="mt-6">
            <h1 className="font-bold capitalize text-4xl">
              <span className="bg-gradient-to-r from-primary to-primary bg-[length:0px_5px] hover:bg-[length:100%_5px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
                {blog.title}
              </span>
            </h1>
          </Link>
          <p className="inline-block mt-4 text-xl font-in">
            {blog.description}
          </p>
        </div>
      </article>
    </div>
  );
};

export default CoverSection;
