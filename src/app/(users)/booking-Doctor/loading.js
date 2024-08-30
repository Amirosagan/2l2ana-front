import SkeletonCard from "@/src/components/loaders/CardLoader";

const SearchDoctorBarSkeleton = () => {
  return (
    <div className="mb-5 items-center flex  flex-col gap-2 mx-5 sm:mt-0 md:mt-10">
       <h2 className="tajawal-extrabold mb-2 text-center md:text-5xl tracking-wide text-4xl">
        ابحثي عن <span className="text-primary"> دكتورك </span> المفضل
      </h2>
      <p className="text-gray-500 text-lg text-center mb-3">
        أكثر من 100 طبيب متخصص في جميع التخصصات، متاحون لتقديم الاستشارات عبر الفيديو أو المكالمات الهاتفية. احصلي على الرعاية الطبية المتميزة من راحة منزلك
      </p>

      <div className="flex w-full max-w-md items-center mx-10 space-x-2 gap-3">
        <div className="bg-gray-300 rounded-full h-12 flex-grow"></div>
        <div className="bg-gray-300 rounded-full h-12 w-24"></div>
      </div>

      <div className="flex gap-2 mt-4 sm:mx-4 items-center justify-center md:mx-10 lg:mx-16 flex-wrap">
        <div className="bg-gray-300 rounded-xl h-9 w-28"></div>
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-gray-300 rounded-xl h-9 w-24"></div>
        ))}
      </div>
      
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
