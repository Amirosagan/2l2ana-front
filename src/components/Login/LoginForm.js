"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "@/src/i18n/routing";
import { login, checkSession } from "@/src/utils/auth";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Link } from '@/src/i18n/routing';
import { Eye, EyeOff } from "lucide-react";
import FormFieldComponent from "../ELements/FormField";
import ErrorMessageComponent from "../ELements/ErrorMessage";
import { useLocale, useTranslations } from "next-intl";

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
  const [showPassword, setShowPassword] = useState(false); 
  const router = useRouter();
  const t = useTranslations("LoginForm");

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
      setErrorMessage(t("invalidLogin"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const locale = useLocale(); // Get the current locale (e.g., 'ar', 'en')
  
  // Determine the direction (RTL for Arabic, LTR for others)
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-full max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4 w-full p-5 m-auto">
            <FormFieldComponent 
              form={form} 
              name="email" 
              label={t("emailLabel")} // Translated label
              type="email" 
            />
            <div className="relative">
              <FormFieldComponent 
                form={form} 
                name="password" 
                label={t("passwordLabel")} // Translated label
                type={showPassword ? "text" : "password"} 
              />
             <div
  onClick={togglePasswordVisibility}
  className={`absolute inset-y-0 ${locale === 'en' ? 'right-0' : 'left-0'} px-3 flex mt-5 items-center cursor-pointer`}
>
  {showPassword ? <Eye className="h-5 w-5 text-gray-500" /> : <EyeOff className="h-5 w-5 text-gray-500" />}
</div>

            </div>
            <div className="flex items-center justify-end -mt-3">
              <Link href="/forgot-password" className="text-accent text-sm tajawal-bold cursor-pointer">{t("forgotPassword")}</Link> {/* Translated text */}
            </div>
            <ErrorMessageComponent errorMessage={errorMessage} />
            <Button type="submit" className="w-full bg-primary p-7 flex md:text-xl text-lg text-white tajawal-bold" disabled={isSubmitting}>
              {isSubmitting ? <Spinner /> : t("login")} {/* Translated button text */}
            </Button>
            <div>
              <h1 className="text-sm tajawal-regular">{t("noAccount")} <Link className="text-accent" href="/register">{t("registerNow")}</Link></h1> {/* Translated text */}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
