import React from "react";
import BlogLayoutThreeSkeleton from "./BlogLayoutThreeSkeleton";

const RecentPostsSkeleton = ({ hideHeader, Home }) => {
  return hideHeader ? (
    <section className="w-full mb-5 px-5 sm:px-5 md:px-24 flex mt-16 flex-col items-center justify-center">
      <div className="w-full items-center flex justify-between">
        <div className={`h-8 w-40 bg-gray-300 animate-pulse rounded ${Home ? 'md:text-3xl' : 'md:text-4xl'}`}></div>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {[...Array(4)].map((_, index) => (
          <article key={index} className="col-span-1 row-span-1 relative">
            <BlogLayoutThreeSkeleton />
          </article>
        ))}
      </div>
    </section>
  ) : (
    <section className="w-full mb-5 sm:mt-20 lg:mt-32 px-5 lg:px-24 flex flex-col items-center justify-center">
      <div className="w-full flex justify-between">
        <div className={`h-8 w-40 bg-gray-300 animate-pulse rounded ${Home ? 'md:text-3xl' : 'md:text-4xl'}`}></div>
        <div className="h-6 w-20 bg-gray-300 animate-pulse rounded"></div>
      </div>
      <div className={`mt-6 ${Home ? 'lg:mt-4' : 'lg:mt-8'} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10`}>
        {[...Array(4)].map((_, index) => (
          <article key={index} className="col-span-1 row-span-1 relative">
            <BlogLayoutThreeSkeleton />
          </article>
        ))}
      </div>
    </section>
  );
};

export default RecentPostsSkeleton;
