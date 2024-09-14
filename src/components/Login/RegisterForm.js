"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "@/src/i18n/routing";
import { useTranslations } from 'next-intl';
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Link } from '@/src/i18n/routing';
import api from "@/src/utils/api";
import { login, checkSession } from "@/src/utils/auth";
import ErrorMessageComponent from "../ELements/ErrorMessage";
import FormFieldComponent from "../ELements/FormField";

const RegisterForm = () => {
  const t = useTranslations('RegisterForm');

  const formSchema = z.object({
    email: z.string().email(t("emailInvalid")),
    password: z.string().min(6, t("passwordMin")), 
    name: z
      .string()
      .min(3, t("nameMin"))
      .refine((value) => value.split(" ").length >= 2, t("nameRequired")), 
    phoneNumber: z.string().min(10, t("phoneInvalid")), 
  });

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
        setErrorMessage(t("emailConflict")); 
      } else {
        setErrorMessage(t("registrationError"));
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
            <FormFieldComponent form={form} name="name" label={t("nameLabel")} />
            {form.formState.errors.name && <p className="text-red-500">{form.formState.errors.name.message}</p>}

            <FormFieldComponent form={form} name="email" label={t("emailLabel")} type="email" />
            {form.formState.errors.email && <p className="text-red-500">{form.formState.errors.email.message}</p>}

            <FormFieldComponent form={form} name="password" label={t("passwordLabel")} type="password" />
            {form.formState.errors.password && <p className="text-red-500">{form.formState.errors.password.message}</p>}

            <FormFieldComponent form={form} name="phoneNumber" label={t("phoneLabel")} />
            {form.formState.errors.phoneNumber && <p className="text-red-500">{form.formState.errors.phoneNumber.message}</p>}

            <ErrorMessageComponent errorMessage={errorMessage} />
            <Button type="submit" className="w-full bg-primary p-7 flex md:text-xl text-lg text-white font-bold" disabled={isSubmitting}>
              {isSubmitting ? t("submitting") : t("register")} 
            </Button>
            <div className="flex justify-between items-center">
              <h1 className="text-sm">{t("alreadyHaveAccount")} <Link className="text-accent" href="/login">{t("loginNow")}</Link></h1>
              <Link className="text-accent text-sm tajawal-regular hover:underline md:-mt-1" href="/termsofuse">{t("termsOfUse")}</Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
