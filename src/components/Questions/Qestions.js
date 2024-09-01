import Link from "next/link";

const Questions = ({ filteredQuestions, pageSize }) => {
    const totalQuestions = filteredQuestions.length > 0 ? filteredQuestions.length : 0;

    const handlePageChange = (newPage) => {
  
    };

    return (
        <div className="lg:w-[100%]">
            {totalQuestions > 0 ? (
                filteredQuestions.slice(0, pageSize).map(question => (
                    <div key={question.id} style={{ backgroundColor: "rgb(239 239 239)" }} className="px-7 w-full py-5 m-auto mb-4 flex flex-col sm:flex-row justify-between border rounded-lg items-center border-neutral-100 bg-neutral-100 overflow-hidden">
                        <div className="w-[100%]">
                            <h1 className="text-black text-lg md:text-lg mb-2"> {question.title} </h1>
                            <p className="overflow-hidden text-sm md:text-base mb-3 text-gray-500"> {question.content} </p>
                            {question.tags.length > 0 && (
                                <span className="text-sm text-primary tajawal-regular"> {question.tags[0].name}</span>
                            )}
                        </div>
                        <Link className="w-full lg:w-40" href={`/medical-questions/${question.id}`}>
                            <button className="bg-accent w-full hover:bg-accent/90 text-white px-4 py-2 lg:py-3 text-sm md:text-base mt-3 lg:mt-0 rounded">شوفي الاجابة</button>
                        </Link>
                    </div>
                ))
            ) : (
                <div className="text-center py-10 text-gray-500">لا توجد نتائج</div>
            )}
            {/* <PaginationControls
                totalQuestions={totalQuestions}
                pageSize={pageSize}
                // onPageChange={handlePageChange}
            /> */}
        </div>
    );
};

export default Questions;
