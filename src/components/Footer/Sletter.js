import React from "react";
import NewsletterForm from "./NewsletterForm"; 

const sletter = () => {
  return (
    <footer className="w-full lg:w-[80%] lg:-mt-0 bg-primary py-4 sm:mb-10 flex flex-col items-center text-light">
      <h3 className="tajawal-medium mt-8 font-medium text-center capitalize text-2xl sm:text-3xl lg:text-4xl px-4">
        إرشادات | فيديوهات | مقالات طبية
      </h3>
      <p className="mt-5 px-4 text-center w-full sm:w-3/5 font-light text-sm sm:text-base">
        Join over 5000 members! Subscribe now for the latest blogs, 
        answers to your questions, and updates on women's health. 
        Stay informed and connected with us!
      </p>

      <NewsletterForm />
    </footer>
  );
};

export default sletter;
