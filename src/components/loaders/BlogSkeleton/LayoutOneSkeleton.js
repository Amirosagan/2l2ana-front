import React from "react";

const BlogLayoutOneSkeleton = () => {
  return (
    <div className="relative flex flex-col border-[2px] cursor-pointer rounded-lg lg:min-h-[300px] min-h-[220px] overflow-hidden animate-pulse">
      <div className="absolute top-0 left-0 w-full h-full bg-gray-300"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent opacity-70" />

      <div className="absolute inset-0 flex flex-col justify-between p-4 text-white h-full">
        <div className="flex justify-between items-start">
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-5 w-16 bg-gray-400 rounded-md"
              ></div>
            ))}
          </div>
          <span className="h-5 w-16 bg-gray-400 rounded-md"></span>
        </div>
        <div className="mt-auto">
          <div className="bg-black bg-opacity-50 p-2 rounded">
            <div className="h-6 bg-gray-400 rounded-md w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogLayoutOneSkeleton;
