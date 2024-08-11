import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Link from "next/link";

const Questions = ({ filteredQuestions }) => {
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const displayedQuestions = filteredQuestions.length > 0 ? filteredQuestions : [];

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < Math.ceil(displayedQuestions.length / pageSize)) {
            setPage(page + 1);
        }
    };

    const startIndex = (page - 1) * pageSize;
    const paginatedQuestions = displayedQuestions.slice(startIndex, startIndex + pageSize);

    return (
        <div className="lg:w-[100%]">
            {paginatedQuestions.length > 0 ? (
                paginatedQuestions.map(question => (
                    <div key={question.id} style={{ backgroundColor: "rgb(239 239 239)" }} className="px-7 w-full py-5 m-auto mb-4 flex flex-col sm:flex-row justify-between border rounded-lg items-center border-neutral-100 bg-neutral-100 overflow-hidden">
                        <div className="w-[100%]">
                            <h1 className="text-black text-lg md:text-lg mb-2"> {question.title} </h1>
                            <p className="overflow-hidden text-sm md:text-base mb-3 text-gray-500"> {question.content} </p>
                            {question.tags.length > 0 && (
                                <span className="text-sm text-primary tajawal-regular"> {question.tags[0].name}</span>
                            )}
                        </div>
                        <Link className="w-full lg:w-40" href={`/medical-questions/${question.id}`}>
                            <button className="bg-accent w-full hover:bg-accent/90 text-white px-4 py-2 lg:py-3 text-sm md:text-base mt-3 lg:mt-0 rounded">شوف الاجابة</button>
                        </Link>
                    </div>
                ))
            ) : (
                <div className="text-center py-10 text-gray-500">لا توجد نتائج</div>
            )}
            {paginatedQuestions.length > 0 && (
                <div className="flex justify-between my-4">
                    <Button 
                        onClick={handlePrevPage} 
                        disabled={page === 1}
                        variant="contained"
                        className="bg-accent hover:bg-accent"
                    >
                        السابق
                    </Button>
                    <Button 
                        onClick={handleNextPage} 
                        disabled={page === Math.ceil(displayedQuestions.length / pageSize)}
                        variant="contained"
                        className="bg-accent hover:bg-accent"
                    >
                        التالي
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Questions;
