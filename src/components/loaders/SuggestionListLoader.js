const SuggestionListLoader = () => {
    return (
      <div className="pt-4 px-4 border-[1px] lg:mx-5 rounded-lg">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="cursor-pointer p-4 hover:bg-slate-100 rounded-lg flex items-center gap-3 animate-pulse">
            <div className="w-[70px] h-[70px] rounded-full bg-gray-300 mr-5" />
            <div className="mt-3 p-1 px-2 flex flex-col gap-2 w-full">
              <div className="bg-gray-300 px-2 p-1 rounded-full text-[10px] w-1/2 h-4" />
              <div className="bg-gray-300 h-6 rounded w-3/4" />
              <div className="flex items-center w-full justify-between">
                <div className="bg-gray-300 h-4 rounded w-1/4" />
                <div className="bg-gray-300 h-4 rounded w-1/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default SuggestionListLoader;
  