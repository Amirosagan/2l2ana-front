import SkeletonCard from "@/src/components/loaders/CardLoader";

const SearchDoctorBarSkeleton = () => {
  return (
    <div className="mb-5 items-center flex flex-col gap-2 mx-5 sm:mt-0 md:mt-10">
      {/* Skeleton for the heading */}
      <div className="bg-gray-300 rounded-full h-10 w-3/4 md:w-2/4 mb-2"></div>

      {/* Skeleton for the paragraph */}
      <div className="bg-gray-300 rounded-full h-6 w-5/6 mb-3"></div>
      <div className="bg-gray-300 rounded-full h-6 w-4/6 mb-3"></div>

      {/* Skeleton for the search bar */}
      <div className="flex w-full max-w-md items-center mx-10 space-x-2 gap-3">
        <div className="bg-gray-300 rounded-full h-12 flex-grow"></div>
        <div className="bg-gray-300 rounded-full h-12 w-24"></div>
      </div>

      {/* Skeleton for the filter tags */}
      <div className="flex gap-2 mt-4 sm:mx-4 items-center justify-center md:mx-10 lg:mx-16 flex-wrap">
        <div className="bg-gray-300 rounded-xl h-9 w-28"></div>
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-gray-300 rounded-xl h-9 w-24"></div>
        ))}
      </div>

      {/* Skeleton cards */}
      <div className="mb-10 xl:mx-[1%] m-auto md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchDoctorBarSkeleton;
