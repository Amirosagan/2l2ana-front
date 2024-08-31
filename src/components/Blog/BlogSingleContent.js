import Link from "next/link";
import BlogDetails from "@/src/components/Blog/BlogDetails";
import RenderMdx from "@/src/components/Blog/RenderMdx";
import siteMetadata from "@/src/utils/siteMetaData";
import Image from "next/image";
import { modifyDropboxUrl } from "@/src/utils/modifyDropboxUrl";
import BlogLayoutThree from "@/src/components/Blog/BlogLayoutThree";
import { slug as slugify } from "github-slugger";
import SuggestionList from "../Doctors/DoctorSuggestionList";
import Tag from "../ELements/Tag";

const BlogPageContent = ({ blog, relatedPosts = [] }) => {
  if (!blog) {
    return <div>Blog not found</div>;
  }

  const { title, content, tags = [], imageUrl, createdAt, updatedAt } = blog;

  const modifiedImageUrl = imageUrl ? modifyDropboxUrl(imageUrl) : null;
  const publishedDate = createdAt ? new Date(createdAt) : null;
  const modifiedDate = updatedAt ? new Date(updatedAt) : null;

  if (publishedDate && isNaN(publishedDate.getTime())) {
    console.error("Invalid published date:", createdAt);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title || "No Title",
    description: content || "No Content",
    image: modifiedImageUrl ? [modifiedImageUrl] : [],
    datePublished: publishedDate ? publishedDate.toISOString() : '',
    dateModified: modifiedDate ? modifiedDate.toISOString() : '',
    author: [
      {
        "@type": "Person",
        name: siteMetadata.author,
        url: siteMetadata.twitter,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <div className="mb-8 -mt-4 text-center relative w-full h-[70vh] bg-dark">
          <div className="w-full z-10 flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {tags.length > 0 && (
              <Tag
                name={tags[0].name}
                link={`/categories?type=posts&tags=${tags[0].id}`}
                className="px-6 text-sm py-2"
              />
            )}
            <h1 className="inline-block mt-6 font-semibold capitalize text-light text-2xl md:text-3xl lg:text-5xl !leading-normal relative w-5/6">
              {title || "No Title"}
            </h1>
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-dark/60 dark:bg-dark/40" />
          {modifiedImageUrl ? (
            <Image
              src={modifiedImageUrl}
              alt={title || "No Title"}
              width={800}
              height={600}
              className="w-full h-full object-cover object-center"
              priority
              sizes="100vw"
              unoptimized={true}
            />
          ) : (
            <div className="w-full h-full flex justify-center items-center bg-gray-200">
              No Image Available
            </div>
          )}
        </div>
        <div className="flex flex-col lg:flex-row md:mx-12 m-auto pt-10 sxl:gap-16 px-5 md:px-10">
          <div className="lg:w-[70%] -mt-10 md:mt-0">
            <BlogDetails blog={blog} slug={slugify(blog.title || blog.id || "no-title")} />
            <div className="m-auto">
              <RenderMdx content={content || "No Content"} />
            </div>
          </div>
          <div className="sticky mt-20 lg:mt-0 lg:max-w-[30%] top-28 lg:h-[calc(100vh-40px)] md:min-w-[370px]">
            <SuggestionList blog={true} /> 
          </div>
        </div>
        {relatedPosts.length > 0 && (
          <div className="w-full mt-28">
            <h3 className="text-lg font-bold mx-5 md:mx-20 lg:mx-20 xl:mx-40 tajawal-regular text-primary">مقالات مشابهة</h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 mx-5 xl:mx-60 lg:mx-40 md:mx-20 lg:grid-cols-3 gap-6 justify-center">
              {relatedPosts.map((post, index) => (
                <div key={index} className="max-w-[340px] mx-auto">
                  <BlogLayoutThree blog={post} />
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="w-full flex justify-center mt-8 md:mt-10">
          <Link href="/blogs">
            <div className="md:mb-10 border-primary text-primary tajawal-bold border-2 hover:bg-primary/10 md:py-3 py-2 w-60 text-center rounded-md md:text-lg">
              المزيد
            </div>
          </Link>
        </div>
      </article>
    </>
  );
};

export default BlogPageContent;
