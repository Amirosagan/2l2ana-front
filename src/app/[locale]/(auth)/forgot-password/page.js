"use client";
import React, { useState } from "react";
import { TextField, Button as MuiButton, Box, CircularProgress } from '@mui/material';
import api from "@/src/utils/api";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRouter } from "@/src/i18n/routing";

const ForgotPasswordForm = () => {
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

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
      setDialogOpen(true);
    }
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setDialogMessage("");
    setIsSuccessMessage(false);
    if (isSuccessMessage) {
      router.push("/login"); 
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-full max-w-md">
        <DialogTitle className="tajawal-bold">إعادة تعيين كلمة المرور</DialogTitle>
        <DialogContent>
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
              <MuiButton variant="outlined" className="tajawal-bold" onClick={() => router.back()}>إلغاء</MuiButton>
              <MuiButton variant="outlined" className="tajawal-bold" onClick={handleForgotPassword} disabled={isSubmitting}>
                {isSubmitting ? <CircularProgress size={24} /> : "إرسال"}
              </MuiButton>
            </Box>
          </DialogActions>
        </DialogContent>
        <Dialog open={dialogOpen} onClose={closeDialog}>
          <DialogTitle className="tajawal-bold">{isSuccessMessage ? "تم الإرسال" : "خطأ"}</DialogTitle>
          <DialogContent>
            <div className={`text-center p-4 tajawal-bold ${isSuccessMessage ? "text-green-900" : "text-red-500"}`}>
              {dialogMessage}
            </div>
          </DialogContent>
          <DialogActions>
            <MuiButton onClick={closeDialog} color="primary">
              موافق
            </MuiButton>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
