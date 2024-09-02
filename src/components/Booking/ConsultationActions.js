import React, { useState, useEffect, useRef } from "react";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { checkSession } from "@/src/utils/auth";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const ConsultationActions = ({
  consultation,
  role,
  isPrevious,
  isWithinWindow,
  isPastConsultation,
  isWithinCancelWindow,
  onShowNotes,
  onShowRatingModal,
  onCompleteConsultation,
  onCancelConsultation = () => {}, // Default function if not provided
  onUpdateConsultation = () => {}, // Default function if not provided
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [updatedConsultation, setUpdatedConsultation] = useState(consultation);
  const [isCancelSuccess, setIsCancelSuccess] = useState(false);  // State for success popup
  const [isCancelButtonVisible, setIsCancelButtonVisible] = useState(true);  // State to control the visibility of the cancel button
  const [showCancelModal, setShowCancelModal] = useState(false);  // State for showing the confirmation modal
  const buttonRef = useRef(null);

  const handleTooltipToggle = () => {
    setTooltipOpen(!tooltipOpen);
  };

  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      setTooltipOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCompleteConsultation = () => {
    onCompleteConsultation();

    const updatedNotes = "الملاحظات الجديدة بعد التعديل"; 
    const updatedConsultationData = {
      ...updatedConsultation,
      notes: updatedNotes,
      isDone: true,
    };
    setUpdatedConsultation(updatedConsultationData);
    onUpdateConsultation(updatedConsultationData);
  };

  const handleCancelConsultation = async () => {
    try {
      const sessionData = await checkSession(); // Fetch the session data
      if (!sessionData || !sessionData.session) {
        console.error('No valid session found. User may need to log in.');
        return;
      }

      const { token } = sessionData;
      const cancelUrl = `https://api.2l2ana.com/api/Consultation/CancleConsultation/${updatedConsultation.id}`;

      const response = await axios.delete(cancelUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,  // Use the token from the session
          'accept': '*/*',
        }
      });

      if (response.status === 200) {
        setIsCancelSuccess(true);  // Show success popup
        setIsCancelButtonVisible(false);  // Hide the cancel button
        onCancelConsultation(updatedConsultation); // Call the prop function
        setShowCancelModal(false);  // Close the confirmation modal
      }
    } catch (error) {
      console.error('Error canceling the consultation:', error);
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized: The token might be invalid or expired.');
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-4 md:mt-0">
      {updatedConsultation.isDone && updatedConsultation.notes && (
        <button
          className="bg-white border-2 border-primary text-primary py-3 shadow-lg tajawal-regular hover:scale-105 transition-all duration-200 rounded-md w-[200px]"
          onClick={onShowNotes}
        >
          عرض ملاحظات الطبيب
        </button>
      )}

      {isPrevious && role !== "Doctor" && (
        updatedConsultation.rating === 0 ? (
          <button
            className="bg-primary text-white py-3 shadow-lg tajawal-regular hover:scale-105 transition-all duration-200 rounded-md w-[200px]"
            onClick={onShowRatingModal}
          >
            تقييم الكشف
          </button>
        ) : (
          <div className="flex justify-center items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${i < updatedConsultation.rating ? "text-yellow-400" : "text-gray-300"}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            ))}
          </div>
        )
      )}

      {role === "Doctor" && (
        isPastConsultation && !updatedConsultation.isDone && (
          <button
            className="bg-primary text-white py-3 shadow-lg tajawal-regular hover:scale-105 transition-all duration-200 rounded-md w-[200px]"
            onClick={handleCompleteConsultation}
          >
            اتمام الكشف
          </button>
        ) 
      )}
      {role === "Doctor" && (
        updatedConsultation.isDone && updatedConsultation.notes && (
          <button
            className="bg-primary text-white py-3 shadow-lg tajawal-regular hover:scale-105 transition-all duration-200 rounded-md w-[200px]"
            onClick={handleCompleteConsultation}
          >
            تعديل الكشف
          </button>
        ) 
      )}

      {!isWithinWindow && !updatedConsultation.isDone && !isPastConsultation && (
        <Tooltip
          title={<span style={{ fontSize: '16px' }}>سيكون رابط الكشف متاحا قبل الموعد الذي تم اختياره ب10 دقائق </span>}
          open={tooltipOpen}
          onClose={() => setTooltipOpen(false)}
          disableHoverListener
        >
          <div
            className="bg-gray-300 text-gray-500 py-3 shadow-lg tajawal-regular rounded-md w-[200px] text-center cursor-pointer"
            onClick={handleTooltipToggle}
            ref={buttonRef}
          >
            Join Meeting
          </div>
        </Tooltip>
      )}
      {isWithinWindow && !updatedConsultation.isDone &&(

            <Tooltip title={<span style={{ fontSize: '16px' }}>سيكون رابط الكشف متاحا قبل الموعد الذي تم اختياره ب10 دقائق</span>}>
              <a
                className="bg-primary text-white py-3 shadow-lg tajawal-regular hover:scale-105 transition-all duration-200 rounded-md w-[200px] text-center"
                href={updatedConsultation.meetingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Meeting
              </a>
            </Tooltip>
      )}

      {role !== "Doctor" && isWithinCancelWindow && isCancelButtonVisible && (
        <>
          <button
            className="bg-red-500 text-white py-3 shadow-lg tajawal-regular hover:scale-105 transition-all duration-200 rounded-md w-[200px]"
            onClick={() => setShowCancelModal(true)}  // Show confirmation modal
          >
            الغاء الحجز
          </button>

          {showCancelModal && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-5 w-full max-w-sm mx-2">
                <h2 className="tajawal-bold text-lg mb-4 text-center">هل انت متأكد من الغاء الحجز ؟</h2>
                <div className="flex justify-between">
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                    onClick={handleCancelConsultation}
                  >
                    نعم الغاء
                  </button>
                  <button
                    className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 transition"
                    onClick={() => setShowCancelModal(false)}
                  >
                    العودة
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Success Popup */}
      <Dialog open={isCancelSuccess} onClose={() => setIsCancelSuccess(false)}>
        <DialogTitle>تم الغاء الحجز بنجاح</DialogTitle>
        <DialogContent>
          <p className="text-2xl">تواصلي معنا عبر <a className="underline text-accent" href="https://wa.me/201210684419" target="_blank" rel="noopener noreferrer">WhatsApp</a> لاسترداد اموالك او حجز كشف اخر.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCancelSuccess(false)} color="primary">
            اغلاق
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConsultationActions;
