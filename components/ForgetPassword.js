import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, Button as MuiButton, Box, CircularProgress } from '@mui/material';
import api from "@/src/utils/api";

const ForgotPassword = ({ open, onClose }) => {
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  return (
    <Dialog open={open} onClose={onClose}>
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
                <MuiButton variant="outlined" className="tajawal-bold" onClick={onClose}>إلغاء</MuiButton>
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
  );
};

export default ForgotPassword;
