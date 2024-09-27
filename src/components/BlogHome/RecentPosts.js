import { Link } from '@/src/i18n/routing';
import BlogLayoutThree from "../Blog/BlogLayoutThree";
import { getTranslations } from 'next-intl/server'; // Use getTranslations for async translation

const RecentPosts = async ({ hideHeader, Home, blogs }) => {
  const t = await getTranslations('RecentPosts'); // Async translation function

  if (!blogs || blogs.length === 0) {
    return (
      <section className="w-full mb-5 mt-32 flex flex-col items-center justify-center">
        <p>{t('noPosts')}</p> {/* Localized message for no posts */}
      </section>
    );
  }

  return hideHeader ? (
    <section className="w-full mb-5 px-5 sm:px-5 md:px-24 sxl:px-32 flex mt-16 flex-col items-center justify-center">
      <div className="w-full items-center flex justify-between">
        <h2 className={`tajawal-bold w-fit text-primary/90 inline-block font-bold capitalize text-2xl ${Home ? 'md:text-3xl' : 'md:text-4xl'}`}>
          {t('header')} {/* Localized header text */}
        </h2>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {blogs.map((blog, index) => (
          <article key={index} className="col-span-1 row-span-1 relative">
            <BlogLayoutThree blog={blog} />
            <div>
              {blog.tags && blog.tags.map((tag, i) => (
                <span key={i} className="tag-class">{tag.name}</span>  // Safely render tag.name
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  ) : (
    <section className="w-full mb-5 sm:mt-20 lg:mt-32 px-5 lg:px-24 flex flex-col items-center justify-center">
      <div className="w-full flex justify-between">
        <h2 className={`tajawal-bold w-fit inline-block text-primary/90 font-bold capitalize text-2xl ${Home ? 'md:text-3xl' : 'md:text-4xl'}`}>
          {t('latestPosts')} {/* Localized latest posts header */}
        </h2>
        <Link href={Home ? "/blogs" : "/categories?type=posts"} className="underline text-lg text-bold text-accent">
          {t('more')} {/* Localized "more" button */}
        </Link>
      </div>
      <div className={` mt-6 ${Home ? 'lg:mt-4' : 'lg:mt-8'} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10`}>
        {blogs.map((blog, index) => (
          <article key={index} className="col-span-1 row-span-1 relative">
            <BlogLayoutThree blog={blog} />
            {/* Ensure tags are rendered correctly */}
            <div>
              {blog.tags && blog.tags.map((tag, i) => (
                <span key={i} className="tag-class">{tag.name}</span>  // Safely render tag.name
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RecentPosts;
