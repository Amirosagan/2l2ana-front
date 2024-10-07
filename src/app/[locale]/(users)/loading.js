import React from 'react';

const Skeleton = () => {
  return (
    <section className="animate-pulse">
      {/* Skeleton for HeroDoctor */}
      <div className="mx-auto max-w-screen-xl lg:h-screen px-4 py-2 pb-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 overflow-hidden rounded-lg bg-gray-300 sm:h-80 lg:order-last lg:h-[528px]" />
          <div className="lg:py-24 space-y-4">
            <div className="h-8 bg-gray-300 rounded w-3/4" />
            <div className="h-4 bg-gray-300 rounded w-1/2" />
            <div className="h-4 bg-gray-300 rounded w-5/6" />
            <div className="mt-8 h-10 bg-gray-300 rounded w-1/3" />
          </div>
        </div>
      </div>

      {/* Skeleton for WhyCard */}
      <div className="flex flex-col items-center w-full py-10 pb-20 bg-neutral-100">
        <div className="h-8 bg-gray-300 rounded w-3/4 mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full lg:w-[80%]">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="space-y-4">
              <div className="h-20 bg-gray-300 rounded" />
              <div className="h-4 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-300 rounded w-1/2" />
              <div className="h-4 bg-gray-300 rounded w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Skeleton for ArticleCard */}
      <div className="overflow-hidden rounded-lg w-[88%] lg:w-[75%] md:w-[100%] lg:mb-20 my-10 md:mb-10 m-auto bg-neutral-100 flex justify-between items-center flex-col lg:flex-row animate-pulse">
        <div className="flex flex-col gap-4 px-4 py-8 w-full lg:w-1/2">
          <div className="h-6 bg-gray-300 rounded w-1/2 mb-5" />
          <div className="space-y-4 w-full">
            <div className="h-10 bg-gray-300 rounded w-full" />
            <div className="h-10 bg-gray-300 rounded w-full" />
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center lg:h-full min-w-[300px] bg-gray-300 rounded-lg w-full lg:w-1/2 h-64" />
      </div>
    </section>
  );
};

export default Skeleton;
