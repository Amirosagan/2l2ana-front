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

// Define the form schema using Zod
const formSchema = z.object({
  email: z.string().email("يجب أن يكون بريد إلكتروني صالح"),
  password: z.string().min(6, "كلمة السر يجب أن تحتوي على 6 أحرف على الأقل"),
  name: z
    .string()
    .min(3, "يجب أن يحتوي على الاسم الأول واسم العائلة")
    .refine((value) => value.split(" ").length >= 2, "يجب أن يحتوي على الاسم الأول ومسافة واسم العائلة 'ex: mai ahmed'"
  ),
  phoneNumber: z.string().min(10, "رقم الهاتف يجب أن يكون صالح"),
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
    },
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
      if (error.response && error.response.data[0]?.code === "General.Conflict") {
        setErrorMessage("البريد الإلكتروني مستخدم بالفعل. يرجى تسجيل الدخول.");
      } else {
        setErrorMessage("حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.");
      }
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
            {form.formState.errors.name && <p className="text-red-500">{form.formState.errors.name.message}</p>}

            <FormFieldComponent form={form} name="email" label="البريد الالكتروني" type="email" />
            {form.formState.errors.email && <p className="text-red-500">{form.formState.errors.email.message}</p>}

            <FormFieldComponent form={form} name="password" label="كلمة السر" type="password" />
            {form.formState.errors.password && <p className="text-red-500">{form.formState.errors.password.message}</p>}

            <FormFieldComponent form={form} name="phoneNumber" label="رقم الهاتف" />
            {form.formState.errors.phoneNumber && <p className="text-red-500">{form.formState.errors.phoneNumber.message}</p>}

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
