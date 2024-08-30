import React from "react";

const SkeletonCard = () => {
  return (
    <div className="border-[1px] min-h-[450px] max-h-[450px] min-w-[300px] mt-5 lg:max-w-[300px] md:max-w-[294px] xl:max-w-[310px] cursor-pointer bg-neutral-50 transition-all ease-in-out hover:shadow-sm rounded-lg p-3 flex flex-col justify-between animate-pulse">
      <div className="h-[200px] w-full bg-gray-300 rounded-lg"></div>
      <div className="mt-3 flex-grow flex flex-col items-start gap-2">
        <div className="h-[24px] w-1/2 bg-gray-300 rounded-full"></div>
        <div className="h-[24px] w-3/4 bg-gray-300 rounded-lg"></div>
        <div className="h-[20px] w-1/2 bg-gray-300 rounded-lg"></div>
      </div>
      <div className="flex flex-col mt-1">
        <div className="flex flex-col items-start gap-2 justify-between">
          <div className="h-[24px] w-1/4 bg-gray-300 rounded-full"></div>
          <div className="h-[20px] w-3/4 bg-gray-300 rounded-lg"></div>
        </div>
        <div className="h-[40px] w-full bg-gray-300 rounded-full mt-2"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;

