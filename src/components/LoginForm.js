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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, Button as MuiButton, Box, CircularProgress } from '@mui/material';
import api from "@/src/utils/api";

const formSchema = z.object({
  email: z.string().email("يجب أن يكون بريد إلكتروني صالح"),
  password: z.string(),
});

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [forgotPasswordDialogOpen, setForgotPasswordDialogOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
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

  const handleForgotPassword = async () => {
    setIsSubmitting(true);
    try {
      const response = await api.post("/Auth/ForgotPassword", {
        email: forgotPasswordEmail,
      });

      if (response.status === 200) {
        setIsSuccessMessage(true);
        setDialogMessage("تحقق من بريدك الإلكتروني للحصول على رابط إعادة التعيين.");
      } else {
        setIsSuccessMessage(false);
        setDialogMessage("فشل في إرسال رابط إعادة التعيين. حاول مرة أخرى.");
      }
    } catch (error) {
      console.error("Error sending forgot password request:", error);
      setIsSuccessMessage(false);
      setDialogMessage("حدث خطأ. حاول مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openForgotPasswordDialog = () => {
    setForgotPasswordDialogOpen(true);
  };

  const closeForgotPasswordDialog = () => {
    setForgotPasswordDialogOpen(false);
    setDialogMessage("");
    setIsSuccessMessage(false);
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
              <Link href="#" onClick={openForgotPasswordDialog} className="text-accent text-sm tajawal-bold cursor-pointer">نسيت كلمة السر؟</Link>
            </div>
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            <Button type="submit" className="w-full bg-primary p-7 flex md:text-xl text-lg text-white tajawal-bold" disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress size={24} /> : "تسجيل الدخول"}
            </Button>
            <div>
              <h1 className="text-sm tajawal-regular">ليس لديك حساب؟ <Link className="text-accent" href="/register">سجل الأن</Link></h1>
            </div>
          </form>
        </Form>
        <Dialog open={forgotPasswordDialogOpen} onClose={closeForgotPasswordDialog}>
          <DialogTitle className="tajawal-bold">إعادة تعيين كلمة المرور</DialogTitle>
          <DialogContent>
            {isSuccessMessage ? (
              <div className="text-center p-4 tajawal-bold text-green-900">
                تحقق من بريدك الإلكتروني للحصول على رابط إعادة التعيين.
              </div>
            ) : (
              <>
                <DialogContentText className="tajawal-medium">
                  يرجى إدخال عنوان بريدك الإلكتروني لتلقي رابط لإعادة تعيين كلمة المرور الخاصة بك.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="forgot-password-email"
                  label="البريد الإلكتروني"
                  type="email"
                  fullWidth
                  variant="outlined"
                  className="p-2"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                />
                <DialogActions>
                  <Box display="flex" className="mx-4 pb-3" justifyContent="flex-start" gap={2} width="100%">
                    <MuiButton variant="outlined" className="tajawal-bold" onClick={closeForgotPasswordDialog}>إلغاء</MuiButton>
                    <MuiButton variant="outlined" className="tajawal-bold" onClick={handleForgotPassword} disabled={isSubmitting}>
                      {isSubmitting ? <CircularProgress size={24} /> : "إرسال"}
                    </MuiButton>
                  </Box>
                </DialogActions>
              </>
            )}
          </DialogContent>
          {dialogMessage && !isSuccessMessage && (
            <div className={`text-center p-4 tajawal-bold ${isSuccessMessage ? "text-green-900" : "text-red-500"}`}>
              {dialogMessage}
            </div>
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default LoginForm;
