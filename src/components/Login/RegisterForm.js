"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import api from "@/src/utils/api";
import { login, checkSession } from "@/src/utils/auth";
import ErrorMessageComponent from "../ELements/ErrorMessage";
import FormFieldComponent from "../ELements/FormField";

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

  useEffect(() => {
    const checkUserSession = async () => {
      const session = await checkSession();
      if (session?.session) {
        router.push("/");
      }
    };
    checkUserSession();
  }, [router]);

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
            <FormFieldComponent form={form} name="name" label="الاسم" />
            <FormFieldComponent form={form} name="email" label="البريد الالكتروني" type="email" />
            <FormFieldComponent form={form} name="password" label="كلمة السر" type="password" />
            <FormFieldComponent form={form} name="phoneNumber" label="رقم الهاتف" />
            <ErrorMessageComponent errorMessage={errorMessage} />
            <Button type="submit" className="w-full bg-primary p-7 flex md:text-xl text-lg text-white font-bold" disabled={isSubmitting}>
              {isSubmitting ? "جاري انشاء الحساب..." : "تسجيل"}
            </Button>
            <div className="flex justify-between items-center">
               <h1 className="text-sm">لديك حساب؟ <Link className="text-accent" href="/login">سجل الدخول</Link></h1>
              <Link className="text-accent text-sm tajawal-regular hover:underline md:-mt-1" href="/termsofuse">سياسات الاستخدام </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
