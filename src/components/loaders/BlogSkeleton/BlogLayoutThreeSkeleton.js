import React from "react";

const BlogLayoutThreeSkeleton = () => {
  return (
    <div className="group flex flex-col border-[2px] min-w-[380px] cursor-pointer bg-white rounded-lg p-3 h-full animate-pulse">
      <div className="relative h-32 md:h-56 w-full rounded-xl overflow-hidden bg-gray-300"></div>
      <div className="flex flex-col w-full mt-2 flex-grow">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="flex flex-col justify-end mt-2 flex-grow">
          <div className="flex flex-row justify-between items-center mt-2">
            <span className="h-4 bg-gray-300 rounded w-1/3"></span>
            <div className="flex space-x-2">
              <span className="h-4 bg-gray-300 rounded w-8"></span>
              <span className="h-4 bg-gray-300 rounded w-8"></span>
              <span className="h-4 bg-gray-300 rounded w-8"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogLayoutThreeSkeleton;
