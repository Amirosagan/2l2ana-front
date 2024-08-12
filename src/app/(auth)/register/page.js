"use client";
import * as z from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import api from "@/src/utils/api";  
import { login } from "@/src/utils/auth";

const formSchema = z.object({
  email: z.string().email("Must be a valid email"),
  password: z.string(),
  name: z
    .string()
    .min(3, "Must contain at least first name and last name")
    .refine((value) => value.split(" ").length >= 2, "Must include both first name and last name"),
  phoneNumber: z.string(),
});

const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phoneNumber: "",
    }
  });

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    const [firstName, ...lastNameParts] = data.name.split(" ");
    const lastName = lastNameParts.join(" ");
    const requestData = {
      email: data.email,
      password: data.password,
      firstName,
      lastName,
      phoneNumber: data.phoneNumber,
      profilePicture: "",
    };

    try {
      await api.post("/Auth/register/user", requestData);
      const response = await login(data.email, data.password);
      localStorage.setItem('token', response.token);
      setErrorMessage("");
      router.push("/");
    } catch (error) {
      setErrorMessage("There was an error with your registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-full max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4 w-full p-5 m-auto">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="">الاسم </FormLabel>
                  <FormControl>
                    <Input className="p-7" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="">البريد الالكتروني</FormLabel>
                  <FormControl>
                    <Input className="p-7" placeholder="" type="email" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="">كلمة السر</FormLabel>
                  <FormControl>
                    <Input className="p-7" placeholder="" type="password" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="">رقم الهاتف</FormLabel>
                  <FormControl>
                    <Input className="p-7" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            <Button type="submit" className="w-full bg-primary p-7 flex md:text-xl text-lg text-white font-bold" disabled={isSubmitting}>
              {isSubmitting ? "جاري انشاء الحساب..." : "تسجيل"}
            </Button>
            <div className="">
               <h1 className="text-sm">لديك حساب؟ <Link className="text-accent" href="/login">سجل الدخول</Link></h1>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen max-h-screen h-screen overflow-hidden">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
