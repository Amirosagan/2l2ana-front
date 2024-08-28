import BlogLayoutThree from "../Blog/BlogLayoutThree";
import api from "@/src/utils/api";
import { slug } from "github-slugger";
import Link from "next/link";

const RecentPosts = async ({ hideHeader, Home }) => {
  let blogs = [];

  try {
    let pageSize = 6;
    if (hideHeader) {
      pageSize = 20;
    } else if (Home) {
      pageSize = 3;
    }

    const response = await api.get(`/Post?pageSize=${pageSize}`);
    blogs = response.data.items.map(item => ({
      id: item.id,
      title: item.title,
      publishedAt: item.createdAt,
      image: {
        filePath: item.imageUrl,
        blurhashDataUrl: '',
        width: 800,
        height: 600
      },
      tags: item.tags.map(tag => tag.name),
      url: `/blogs/${slug(item.id)}`
    }));

    if (blogs.length === 0) {
      return (
        <section className="w-full mb-5 mt-32 flex flex-col items-center justify-center">
          <p>No recent posts available.</p>
        </section>
      );
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }

  return hideHeader ? (
    <section className="w-full mb-5 px-5 sm:px-5 md:px-24 sxl:px-32 flex mt-16 flex-col items-center justify-center">
      <div className="w-full items-center flex justify-between">
        <h2 className={`tajawal-bold w-fit text-primary/90 inline-block font-bold capitalize text-2xl ${Home ? 'md:text-3xl' : 'md:text-4xl'}`}>
          المقالات
        </h2>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {blogs.map((blog, index) => (
          <article key={index} className="col-span-1 row-span-1 relative">
            <BlogLayoutThree blog={blog} />
          </article>
        ))}
      </div>
    </section>
  ) : (
    <section className="w-full mb-5 sm:mt-20 lg:mt-32 px-5 lg:px-24 flex flex-col items-center justify-center">
      <div className="w-full flex justify-between">
        <h2 className={`tajawal-bold w-fit inline-block text-primary/90 font-bold capitalize text-2xl ${Home ? 'md:text-3xl' : 'md:text-4xl'}`}>
          أحدث المقالات
        </h2>
        <Link href={Home ? "/blogs" : "/categories?type=posts"} className="underline text-lg text-bold text-accent">
          المزيد
        </Link>
      </div>
      <div className={` mt-6 ${Home ? 'lg:mt-4' : 'lg:mt-8'} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10`}>
        {blogs.map((blog, index) => (
          <article key={index} className="col-span-1 row-span-1 relative">
            <BlogLayoutThree blog={blog} />
          </article>
        ))}
      </div>
    </section>
  );
};

export default RecentPosts;
