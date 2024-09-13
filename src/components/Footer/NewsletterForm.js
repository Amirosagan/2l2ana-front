"use client";

import React from "react";
import { useForm } from "react-hook-form";

const NewsletterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className="my-6 w-fit sm:min-w-[384px] flex items-stretch bg-light p-1 sm:p-2 rounded"
    >
      <input
        type="email"
        placeholder="Enter your email"
        {...register("email", { required: true, maxLength: 80 })}
        className="w-full bg-transparent px-2 sm:pl-0 text-dark focus:border-dark focus:ring-0 border-0 border-b mx-2 pb-1"
      />
      <input
        type="submit"
        className="bg-accent text-light cursor-pointer font-medium rounded px-3 sm:px-5 py-1"
      />
    </form>
  );
};

export default NewsletterForm;
