"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { login, checkSession } from "@/src/utils/auth";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react"; // Import the icons
import FormFieldComponent from "../ELements/FormField";
import ErrorMessageComponent from "../ELements/ErrorMessage";

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
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
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
    try {
      const response = await login(data.email, data.password, rememberMe);
      localStorage.setItem('token', response.token);
      setErrorMessage("");

      const session = await checkSession();
      if (session?.session?.role === 'Admin') {
        router.push('/asdkjklasdlkja21321jlkasd/users');
      } else {
        router.push('/');
      }
    } catch (error) {
      setErrorMessage("بريد إلكتروني أو كلمة مرور غير صالحة. حاول مرة اخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-full max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4 w-full p-5 m-auto">
            <FormFieldComponent 
              form={form} 
              name="email" 
              label="البريد الالكتروني" 
              type="email" 
            />
            <div className="relative">
              <FormFieldComponent 
                form={form} 
                name="password" 
                label="كلمة السر" 
                type={showPassword ? "text" : "password"} 
              />
              <div
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 left-0 pl-3 flex mt-5 items-center cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
              </div>
            </div>
            <div className="flex items-center justify-end -mt-3">
              <Link href="/forgot-password" className="text-accent text-sm tajawal-bold cursor-pointer">نسيت كلمة السر؟</Link>
            </div>
            <ErrorMessageComponent errorMessage={errorMessage} />
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
