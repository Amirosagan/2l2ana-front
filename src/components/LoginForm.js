"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { login } from "@/src/utils/auth";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Spinner = () => (
  <div className="spinner">
    <style jsx>{`
      .spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border-left-color: #09f;
        animation: spin 1s ease infinite;
      }
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);

const formSchema = z.object({
  email: z.string().email("يجب أن يكون بريد إلكتروني صالح"),
  password: z.string(),
});

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await login(data.email, data.password, rememberMe);
      localStorage.setItem('token', response.token);
      setErrorMessage("");
      router.push("/"); 
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("بريد إلكتروني أو كلمة مرور غير صالحة. حاول مرة اخرى.");
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
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="tajawal-bold">البريد الالكتروني</FormLabel>
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
                  <FormLabel className="tajawal-bold">كلمة السر</FormLabel>
                  <FormControl>
                    <Input className="p-7" placeholder="" type="password" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end -mt-3">
              <Link href="/forgot-password" className="text-accent text-sm tajawal-bold cursor-pointer">نسيت كلمة السر؟</Link>
            </div>
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            <Button type="submit" className="w-full bg-primary p-7 flex md:text-xl text-lg text-white tajawal-bold" disabled={isSubmitting}>
              {isSubmitting ? <Spinner /> : "تسجيل الدخول"}
            </Button>
            <div>
              <h1 className="text-sm tajawal-regular">ليس لديك حساب؟ <Link className="text-accent" href="/register">سجل الأن</Link></h1>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
