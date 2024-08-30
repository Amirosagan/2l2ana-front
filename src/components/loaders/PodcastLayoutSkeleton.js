const PodcastLayoutSkeleton = () => {
  return (
    <div className="group flex flex-col items-center border-[2px] cursor-pointer rounded-lg p-3 animate-pulse">
      <div className="relative h-40 w-full rounded-xl overflow-hidden bg-gray-200">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-3/4 h-3/4 bg-gray-300"></div>
        </div>
      </div>
      <div className="flex flex-col w-full mt-2 flex-grow">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="flex flex-col justify-end flex-grow">
          <div className="flex flex-row justify-between items-center mt-1 md:mt-2">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="flex space-x-2">
              <div className="h-4 bg-gray-300 rounded w-1/5"></div>
              <div className="h-4 bg-gray-300 rounded w-1/5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastLayoutSkeleton;
