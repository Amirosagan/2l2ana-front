"use client";
import React from "react";
import { useForm } from "react-hook-form";
const sletter = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <footer style={{backgroundColor:"rgb(52 146 150)"}} className="w-full lg:w-[80%] lg:-mt-0 bg-dark py-4 sm:mb-10 flex flex-col items-center text-light dark:text-dark">
      <h3 className="tajawal-medium mt-8 font-medium dark:font-bold text-center capitalize text-2xl sm:text-3xl lg:text-4xl px-4">
        إرشادات | فيديوهات | مقالات طبية
      </h3>
      <p className="mt-5 px-4 text-center w-full sm:w-3/5 font-light dark:font-medium text-sm sm:text-base">
        Join over 5000 members! Subscribe now for the latest blogs, 
        answers to your questions, and updates on women's health. 
        Stay informed and connected with us!
      </p>

      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="my-6 w-fit sm:min-w-[384px] flex items-stretch bg-light dark:bg-dark p-1 sm:p-2 rounded mx04"
      >
        <input
          type="email"
          placeholder="Enter your email"
          {...register("email", { required: true, maxLength: 80 })}
          className="w-full bg-transparent pl-2 sm:pl-0 text-dark focus:border-dark focus:ring-0 border-0 border-b mr-2 pb-1"
        />
        <input
          type="submit"
          className="bg-accent text-light dark:text-dark dark:bg-light cursor-pointer font-medium rounded px-3 sm:px-5 py-1"
        />
      </form>
    </footer>
  );
};

export default sletter;
