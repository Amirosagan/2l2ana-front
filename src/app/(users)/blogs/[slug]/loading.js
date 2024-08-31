import React from 'react';
import SuggestionListLoader from '@/src/components/loaders/SuggestionListLoader';

const SkeletonBlogPageContent = () => {
  return (
    <article>
      <div className="mb-8 -mt-4 text-center relative w-full h-[70vh] bg-gray-300 animate-pulse">
        <div className="w-full z-10 flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* Skeleton for Tag */}
          <div className="h-8 w-32 bg-gray-300 rounded-full mb-4"></div>

          {/* Skeleton for Title */}
          <div className="h-12 w-2/3 bg-gray-400 rounded"></div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row md:mx-12 m-auto pt-10 sxl:gap-16 px-5 md:px-10">
        <div className="lg:w-[70%] -mt-10 md:mt-0">
          {/* Skeleton for BlogDetails */}
          <div className="px-2 md:px-10 mb-3 bg-gray-300 text-light py-2 flex items-center justify-around flex-wrap text-lg sm:text-xl font-medium mx-5 md:mx-10 rounded-lg animate-pulse">
            <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
          </div>

          {/* Skeleton for RenderMdx */}
          <div className="custom-quill preview animate-pulse">
            <div className="h-6 w-3/4 bg-gray-300 rounded mb-4"></div>
            <div className="h-6 w-5/6 bg-gray-300 rounded mb-4"></div>
            <div className="h-6 w-2/3 bg-gray-300 rounded mb-4"></div>
            <div className="mt-8 mb-10 p-8 rounded-lg shadow-2xl bg-gray-200">
              <div className="h-4 w-1/2 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 w-1/3 bg-gray-300 rounded mb-4"></div>
            </div>
          </div>
        </div>

        <div className="sticky mt-20 lg:mt-0 lg:max-w-[30%] top-28 lg:h-[calc(100vh-40px)] md:min-w-[370px]">
        <SuggestionListLoader/>
        </div>
      </div>
    </article>
  );
};

export default SkeletonBlogPageContent;
