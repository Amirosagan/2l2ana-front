import SuggestionListLoader from "@/src/components/loaders/SuggestionListLoader";

const Loading = () => {
    return (  <div dir="rtl" className="p-5 -mt-5 md:mt-0 md:px-32">
        <div className="grid grid-cols-1 lg:grid-cols-9 gap-5">
          <div className="lg:col-span-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 border-[1px] p-5 md:mt-5 rounded-lg animate-pulse">
        <div className="bg-gray-300 rounded-lg h-[240px] lg:min-h-[280px] w-full"></div>

        <div className="col-span-2 mt-5 md:px-10 flex flex-col gap-3">
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="flex gap-2 items-center">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
          </div>
          <div className="flex flex-col items-start gap-2">
           
            <div className="h-6 bg-gray-300 rounded w-1/2 mt-3"></div>
          </div>
          <div className="h-10 bg-gray-300 rounded w-2/3 mt-5"></div>
        </div>
      </div>

      <div className="p-3 border-[1px] rounded-lg mt-5 animate-pulse">
        <h2 className="tajawal-medium text-[18px] flex gap-2 items-center text-primary">
        </h2>
        <div className="h-4 bg-gray-300 rounded mt-4 w-full"></div>
        <div className="h-4 bg-gray-300 rounded mt-2 w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded mt-2 w-2/3"></div>
      </div>
          </div>
          <div className="lg:col-span-3 lg:mx-5 m-auto mt-5 lg:min-w-[370px] w-full">
            <SuggestionListLoader />
          </div>
        </div>
      </div> );
}
 
export default Loading;


