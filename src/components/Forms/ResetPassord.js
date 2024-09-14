"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams} from "next/navigation";
import { useRouter } from "@/src/i18n/routing";

import { TextField, Button, Box } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formSchema = z
  .object({
    newPassword: z.string().min(6, "كلمة السر يجب أن تكون على الأقل 6 أحرف"),
    confirmPassword: z.string().min(6, "يجب تأكيد كلمة السر"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "كلمة السر غير متطابقة",
    path: ["confirmPassword"],
  });

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    let emailParam = decodeURIComponent(searchParams.get("email") || "");
    let tokenParam = decodeURIComponent(searchParams.get("token") || "");

    // Replace any spaces with + and remove any leading +
    tokenParam = tokenParam.replace(/ /g, "+").replace(/^\+/, "");

    // Trim any spaces from the email
    emailParam = emailParam.trim();

    if (emailParam && tokenParam) {
      setEmail(emailParam);
      setToken(tokenParam);
    } else {
      router.push("/");
    }
  }, [searchParams, router]);

  const handleSubmit = async (data) => {
    const requestBody = { email, token, newPassword: data.newPassword };
    console.log("Request Body:", requestBody);

    try {
      const response = await fetch(
        "https://api.2l2ana.com/api/Auth/ResetPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      // Check for the response status
      if (response.status === 200 || response.status === 204) {
        // Password reset succeeded
        toast.success("تم تغيير كلمة المرور بنجاح");
        router.push("/login");
      } else {
        // Response was not successful, parse the error
        const responseData = await response.json();
        toast.error(`فشل في إعادة تعيين كلمة المرور: ${responseData.message}`);
      }
    } catch (error) {
      // Catch network errors or other unexpected issues
      console.error("Error resetting password:", error);
      toast.error("حدث خطأ. حاول مرة أخرى.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <h1 className="tajawal-bold text-lg">إعادة تعيين كلمة السر</h1>
      <Box
        component="form"
        onSubmit={form.handleSubmit(handleSubmit)}
        sx={{ mt: 2, width: "100%", maxWidth: 400 }}
      >
        <TextField
          label="البريد الإلكتروني"
          value={email}
          fullWidth
          margin="normal"
          InputProps={{ readOnly: true }}
        />
        <TextField
          label="كلمة السر الجديدة"
          type="password"
          {...form.register("newPassword")}
          error={!!form.formState.errors.newPassword}
          helperText={form.formState.errors.newPassword?.message}
          fullWidth
          margin="normal"
          className="p-1"
        />
        <TextField
          label="تأكيد كلمة السر"
          type="password"
          {...form.register("confirmPassword")}
          error={!!form.formState.errors.confirmPassword}
          helperText={form.formState.errors.confirmPassword?.message}
          fullWidth
          margin="normal"
          className="p-1"
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          className="bg-primary hover:bg-primary"
        >
          إعادة تعيين كلمة السر
        </Button>
      </Box>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
