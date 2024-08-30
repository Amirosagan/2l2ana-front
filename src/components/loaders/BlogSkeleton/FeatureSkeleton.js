import React from "react";
import BlogLayoutOneSkeleton from "./LayoutOneSkeleton";

const FeaturePostsSkeleton = () => {
  return (
    <section className="w-full mt-16 sm:mt-24 md:mt-32 px-5 sm:px-10 lg:px-24 flex flex-col items-center justify-center ">
      <div className="h-8 w-40 bg-gray-300 animate-pulse rounded mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 sm:mt-10 w-full h-full">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="group relative bg-neutral-200 flex flex-col border-[2px] cursor-pointer rounded-lg lg:min-h-[300px] min-h-[220px] overflow-hidden">
            <BlogLayoutOneSkeleton />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturePostsSkeleton;
