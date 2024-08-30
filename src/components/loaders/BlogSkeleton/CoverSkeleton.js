import React from "react";

const CoverSectionSkeleton = () => {
  return (
    <div className="w-full">
      <h1
        className="text-3xl mx-4 mb-5 mt-2 md:hidden animate-pulse"
        style={{ backgroundColor: "rgb(92, 194, 198)", height: "2rem", width: "150px" }}
      >
        &nbsp;
      </h1>
      <article className="flex flex-col items-start mx-5 lg:w-[90%] lg:m-auto justify-end relative md:h-[80vh]">
        <div className="absolute right-0 top-0 left-0 bottom-0 bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-3xl z-0"></div>
        <div className="w-full h-full bg-gray-300 rounded-3xl -z-10 border-4 animate-pulse"></div>
        <div className="w-3/4 p-16 flex flex-col items-start justify-center z-0 cursor-pointer text-light animate-pulse">
          <div className="h-6 w-32 bg-gray-300 rounded-full mb-4"></div>
          <div className="h-10 w-full bg-gray-300 rounded-lg mb-4"></div>
          <div className="h-20 w-full bg-gray-300 rounded-lg"></div>
        </div>
      </article>
    </div>
  );
};

export default CoverSectionSkeleton;
