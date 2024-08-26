"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import ConsultationCard from "./ConsultationCard";
import api from "@/src/utils/api";
import { checkSession } from "@/src/utils/auth";
import Modal from "@/src/components/Booking/modal";
import RatingModal from "@/src/components/Booking/RatingModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingList = React.memo(({ consultations, doctorDetails, role, isPrevious, onRefetchNotDoneConsultations }) => {
  const [userDetails, setUserDetails] = useState({});
  const [medicalFiles, setMedicalFiles] = useState({});
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [downloadLoading, setDownloadLoading] = useState({});
  const [token, setToken] = useState(null);
  const [showNotes, setShowNotes] = useState(false);
  const [updatedConsultations, setUpdatedConsultations] = useState(consultations);

  useEffect(() => {
    const verifySession = async () => {
      const { session, token } = await checkSession();
      if (session) {
        setToken(token);
      }
    };
    verifySession();
  }, []);

  const fetchUserDetails = useCallback(async (userId) => {
    if (!token) return null;
    const response = await api.get(`/User/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }, [token]);

  const fetchMedicalFiles = useCallback(async (userId) => {
    if (!token) return [];

    const response = await api.get(`/MedicalFile`, {
      params: { userId },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.medicalFiles || [];
  }, [token]);

  const fetchAllUserDetails = useCallback(async () => {
    const userIds = [...new Set(updatedConsultations.map((consultation) => consultation.userId))];
    const userDetailsMap = {};
    const medicalFilesMap = {};

    for (const id of userIds) {
      const userDetails = await fetchUserDetails(id);
      if (userDetails) userDetailsMap[id] = userDetails;

      const files = await fetchMedicalFiles(id);
      if (files.length > 0) medicalFilesMap[id] = files;
    }
    setUserDetails(userDetailsMap);
    setMedicalFiles(medicalFilesMap);
  }, [updatedConsultations, fetchUserDetails, fetchMedicalFiles]);

  useEffect(() => {
    if (role === "Doctor") fetchAllUserDetails();
  }, [updatedConsultations, role, fetchAllUserDetails]);

  const handleDownloadFile = (fileId, url) => {
    setDownloadLoading((prevState) => ({ ...prevState, [fileId]: true }));
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = url;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadLoading((prevState) => ({ ...prevState, [fileId]: false }));
    }, 1000);
  };

  const handleCancelConsultation = async () => {
    if (!token || !selectedConsultation) return;

    try {
      await api.delete(`/Consultation/CancleConsultation/${selectedConsultation.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowCancelModal(false);
      toast.success("Consultation cancelled successfully");
    } catch (error) {
      console.error("Failed to cancel consultation:", error);
      toast.error("Failed to cancel consultation");
    }
  };

  const handleConsultationSubmit = async (notes, file) => {
    setUploading(true);

    try {
      let fileUrl = "";

      if (file) {
        // Step 1: Upload the file to get the URL
        const formData = new FormData();
        formData.append("file", file);

        const uploadResponse = await api.post("/Upload", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        fileUrl = uploadResponse.data.fileUrl;

        // Step 2: Submit the medical file information
        await api.post(
          "/MedicalFile",
          {
            userId: selectedConsultation.userId, 
            fileName: file.name,
            contentType: file.type,
            url: fileUrl,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // Step 3: Submit the consultation notes
      const doneResponse = await api.post(
        "/Consultation/Doctor/DoneConsultation",
        {
          consultationId: selectedConsultation.id,
          notes: notes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (doneResponse.status === 200) {
        toast.success("Consultation completed successfully");
        setShowModal(false);
        onRefetchNotDoneConsultations();
      } else {
        toast.error("Failed to complete consultation");
      }
    } catch (error) {
      console.error("Error submitting consultation:", error);
      toast.error("An error occurred while submitting the consultation.");
    } finally {
      setUploading(false);
    }
  };

  const handleRatingSubmit = async (consultationId, rating) => {
    try {
      const updated = updatedConsultations.map((consultation) =>
        consultation.id === consultationId
          ? { ...consultation, rating }
          : consultation
      );
      setUpdatedConsultations(updated);
    } catch (error) {
      console.error("Failed to update rating:", error);
    }
  };

  const currentConsultations = useMemo(() => {
    // Sort consultations by date and time (earliest first)
    const sortedConsultations = [...updatedConsultations].sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA - dateB;
    });

    return sortedConsultations.map((consultation) => {
      const doctor = doctorDetails[consultation.doctorId];
      const user = userDetails[consultation.userId];
      const files = medicalFiles[consultation.userId] || [];

      return (
        <ConsultationCard
          key={consultation.id}
          consultation={consultation}
          doctor={doctor}
          user={user}
          files={files}
          role={role}
          isPrevious={isPrevious}
          onShowNotes={(consultation) => {
            setSelectedConsultation(consultation);
            setShowNotes(true);
          }}
          onShowRatingModal={(consultation) => {
            setSelectedConsultation(consultation);
            setShowRatingModal(true);
          }}
          onCompleteConsultation={(consultation) => {
            setSelectedConsultation(consultation);
            setShowModal(true);
          }}
          downloadLoading={downloadLoading}
          handleDownloadFile={handleDownloadFile}
        />
      );
    });
  }, [updatedConsultations, doctorDetails, userDetails, medicalFiles, role, isPrevious, downloadLoading]);

  return (
    <div>
      {currentConsultations}

      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          handleSubmit={handleConsultationSubmit}
          uploading={uploading}
        />
      )}
      {showRatingModal && (
        <RatingModal
          onClose={() => setShowRatingModal(false)}
          consultationId={selectedConsultation?.id}
          onSubmitRating={(rating) => {
            handleRatingSubmit(selectedConsultation.id, rating); 
            setShowRatingModal(false);
          }}
        />
      )}
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

      {showNotes && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-5 w-full flex flex-col items-center max-w-sm mx-2">
            <h2 className="tajawal-bold text-lg mb-4 ">ملاحظات الطبيب</h2>
            <div className="w-full mb-2">
              <textarea
                className="w-full p-2 border border-gray-300 rounded"
                rows="6"
                value={selectedConsultation?.notes || ""}
                readOnly
              />
            </div>
            <div className="flex justify-between w-full mt-2">
              <button
                className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 transition w-full"
                onClick={() => setShowNotes(false)}
              >
                العودة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

BookingList.displayName = "BookingList";
export default BookingList;
