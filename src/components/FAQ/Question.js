"use client";

import { cx } from "class-variance-authority";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const QuestionComponent = ({ question, answer, isOpen, onClick }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight("0px");
    }
  }, [isOpen]);

  return (
    <div>
        <button 
         onClick={onClick}
          className="w-full"> 
      <div
        className={cx(
          "py-4 md:py-7 w-full flex justify-between  tajawal-regular transition-all duration-300 ease-in-out",
          isOpen ? "bg-accent text-white" : "bg-slate-100"
        )}
      >
        <h1 className="mr-7">{question}</h1>
        <div> 
            {isOpen ?   <ArrowUpIcon className="ml-6 w-5 md:w-7" /> :   <ArrowDownIcon className="ml-6" /> }
          
        </div>
      </div>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: height }}
      >
        <div
          className="bg-white tajawal-regular  py-4 md:py-7 "
          ref={contentRef}
        >
          <p className="mx-7 ">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionComponent;
