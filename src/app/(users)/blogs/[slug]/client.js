"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import api from "@/src/utils/api";
import BlogDetails from "@/src/components/Blog/BlogDetails";
import RenderMdx from "@/src/components/Blog/RenderMdx";
import Tag from "@/src/components/ELements/Tag";
import siteMetadata from "@/src/utils/siteMetaData";
import Image from "next/image";
import { slug as slugify } from "github-slugger";
import { modifyDropboxUrl } from "@/src/utils/modifyDropboxUrl";
import SuggestionList from "@/src/components/Doctors/DoctorSuggestionList";
import { format, isValid } from "date-fns";
import { checkSession } from "@/src/utils/auth";

const BlogLayoutThree = ({ blog }) => {
  const date = new Date(blog.publishedAt);
  const formattedDate = isValid(date)
    ? format(date, "MMMM dd, yyyy")
    : "Invalid date";

  return (
    <Link
      href={`/blogs/${blog.id}`}
      className="group flex flex-col border-[2px] cursor-pointer hover:border-primary transition-all ease-in-out hover:shadow-sm rounded-lg p-3 h-full"
    >
      <div className="relative h-56 w-full rounded-xl overflow-hidden">
        {blog.imageUrl ? (
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            width={700}
            height={540}
            className="aspect-[4/3] w-full h-full object-contain object-top group-hover:scale-105 transition-all ease duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized={true}
          />
        ) : (
          <div className="w-full h-full flex justify-center items-center bg-gray-200">
            No Image Available
          </div>
        )}
      </div>
      <div className="flex flex-col w-full mt-2 flex-grow">
        <h2 className="font-semibold capitalize text-base sm:text-lg line-clamp-2">
          <span className="bg-gradient-to-r from-primary/50 to-primary/50 text-black bg-[length:0px_6px] group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
            {blog.title}
          </span>
        </h2>
        <div className="flex flex-col justify-end mt-2 flex-grow">
          <div className="flex flex-row justify-between items-center">
            <span className="capitalize text-gray-500 font-semibold text-sm sm:text-base">
              {formattedDate}
            </span>
            <div className="flex">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-primary text-sm tajawal-medium"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const BlogPageClient = ({ initialBlog }) => {
  const [blog, setBlog] = useState(initialBlog);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const verifySession = async () => {
      const sessionData = await checkSession();
      setIsLoggedIn(!!sessionData);
    };

    verifySession();
  }, []);

  useEffect(() => {
    const fetchRelatedBlogs = async () => {
      try {
        const response = await api.get("/Post");
        const allBlogs = response.data.items;

        let otherBlogs = allBlogs.filter(
          (item) =>
            item.id !== blog.id &&
            item.tags.some((tag) =>
              blog.tags.map((t) => t.id).includes(tag.id),
            ),
        );

        if (otherBlogs.length === 0) {
          otherBlogs = allBlogs.filter(item => item.id !== blog.id);
        }

        const related = otherBlogs.slice(0, 3);
        setRelatedBlogs(related);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    if (blog) {
      fetchRelatedBlogs();
    }
  }, [blog]);

  if (isLoading) {
    return (
      <div className="flex justify-center bg-neutral-300 items-center tajawal-bold text-5xl">
        <div className="w-[70%] h-[500px] bg-neutral-300 flex justify-center items-center"></div>
      </div>
    );
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const { title, content, tags = [], imageUrl } = blog;
  const modifiedImageUrl = modifyDropboxUrl(imageUrl);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description: content,
    image: [modifiedImageUrl],
    datePublished: new Date(blog.createdAt).toISOString(),
    dateModified: new Date(blog.updatedAt || blog.createdAt).toISOString(),
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
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={title} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={typeof window !== "undefined" ? window.location.href : ""}
        />
      </Head>
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
              {title}
            </h1>
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-dark/60 dark:bg-dark/40" />
          <Image
            src={modifiedImageUrl}
            alt={title}
            width={800}
            height={600}
            className="w-full h-full object-cover object-center"
            priority
            sizes="100vw"
            unoptimized={true}
          />
        </div>
        <div className="flex flex-col lg:flex-row md:mx-12 m-auto pt-10 sxl:gap-16 px-5 md:px-10">
          <div className="lg:w-[70%] -mt-10 md:mt-0">
            <BlogDetails blog={blog} slug={slugify(blog.title)} />
            <div className="m-auto">
              <RenderMdx content={content} preview={!isLoggedIn} />
              {!isLoggedIn && (
                <div className="mt-8 mb-10 p-8 rounded-lg shadow-2xl bg-white">
                  <p className="text-center tajawal-regular text-black mb-4">
                    يرجى تسجيل الدخول لعرض المحتوى الكامل. التسجيل مجاني!
                  </p>
                  <Link href="/login">
                    <div className="rounded bg-primary tajawal-bold text-white px-4 py-2 cursor-pointer text-center">
                      تسجيل الدخول
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="sticky mt-20 lg:mt-0 lg:max-w-[30%] top-40 lg:h-[calc(100vh-40px)] md:min-w-[370px]">
            <SuggestionList blog={true} />
          </div>
        </div>
        <div className="md:mx-40">
          <div className="text-accent mt-16 m-auto w-full flex flex-col">
            <h1 className="md:pb-4 md:mx-10 mx-7 mb-5 text-sm md:text-base">مقالات مشابهة:</h1>
            <div className="flex justify-center items-center flex-col md:flex-row flex-wrap gap-5 md:gap-10 w-full relative">
              {relatedBlogs.map((relatedBlog, index) => (
                <BlogLayoutThree key={index} blog={relatedBlog} />
              ))}
            </div>
            <div className="flex items-center justify-center">
              <Link href="/categories?type=posts">
                <button className="bg-accent text-white p-4 px-14 tajawal-bold hover:scale-105 transition-all duration-200 rounded-md cursor-pointer font-bold mt-10">
                  المزيد
                </button>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPageClient;
