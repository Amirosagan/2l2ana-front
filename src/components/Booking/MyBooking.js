"use client";

import { useEffect, useState, useCallback } from "react";
import BookingList from "@/src/components/Booking/BookingList";
import api from "@/src/utils/api";
import { checkSession } from "@/src/utils/auth";
import { TabPanel, Tabs } from "@/components/ui/tabs";
import RatingModal from "@/src/components/Booking/RatingModal";
import Link from "next/link";

const MyBookings = () => {
  const [notDoneConsultations, setNotDoneConsultations] = useState([]);
  const [doneConsultations, setDoneConsultations] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState({});
  const [role, setRole] = useState("");
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [token, setToken] = useState(null);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);

  useEffect(() => {
    const fetchConsultations = async () => {
      const { session, token } = await checkSession();
      if (!session || !token) {
        console.error("User is not authenticated. Redirecting to login...");
        return;
      }

      setToken(token);
      setRole(session?.role || "");

      try {
        const notDoneResponse = await api.get("/Consultation/User/NotDoneConsultation", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotDoneConsultations(notDoneResponse.data.consultations || []); 

        const doneResponse =
          session.role === "Doctor"
            ? await api.get("/Consultation/Doctor/GetDoneConsultation", {
                headers: { Authorization: `Bearer ${token}` },
              })
            : await api.get("/Consultation/User/GetDoneConsultation", {
                headers: { Authorization: `Bearer ${token}` },
              });
        setDoneConsultations(doneResponse.data.consultations || []); // Ensure it's an array
      } catch (error) {
        console.error("Failed to fetch consultations:", error);
        // In case of an error, ensure arrays are set to prevent iterability issues
        setNotDoneConsultations([]);
        setDoneConsultations([]);
      }

      setIsDataFetched(true);
    };

    if (!isDataFetched) {
      fetchConsultations();
    }
  }, [isDataFetched]);

  const fetchDoctorDetails = useCallback(
    async (doctorId) => {
      try {
        const response = await api.get(`/Doctor/${doctorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
      } catch (error) {
        console.error(`Failed to fetch details for doctor ${doctorId}:`, error);
        return null;
      }
    },
    [token]
  );

  const fetchAllDoctorDetails = useCallback(
    async (consultations) => {
      const doctorIds = [...new Set(consultations.map((consultation) => consultation.doctorId))];
      const doctorDetailsMap = {};
      for (const id of doctorIds) {
        const details = await fetchDoctorDetails(id);
        if (details) {
          doctorDetailsMap[id] = details;
        }
      }
      setDoctorDetails(doctorDetailsMap);
    },
    [fetchDoctorDetails]
  );

  useEffect(() => {
    if (isDataFetched && token) {
      const allConsultations = [
        ...(notDoneConsultations || []), 
        ...(doneConsultations || [])
      ]; 
      fetchAllDoctorDetails(allConsultations);
    }
  }, [isDataFetched, token, notDoneConsultations, doneConsultations, fetchAllDoctorDetails]);

  const handleRatingSubmit = async (consultationId, rating) => {
    try {
      await api.post(
        "/Consultation/Rate",
        {
          consultationId,
          rating,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDoneConsultations((prevConsultations) =>
        prevConsultations.map((consultation) =>
          consultation.id === consultationId ? { ...consultation, rating } : consultation
        )
      );
      setShowRatingModal(false);
      setSelectedConsultation(null);
    } catch (error) {
      console.error("Failed to submit rating:", error);
    }
  };

  return (
    <div className="mt-10">
      <div className="flex items-center flex-col md:flex-row gap-3 justify-between"> 
        
      <h2 className="text-2xl tajawal-bold">حجوزاتي</h2>
      {role === "Doctor" && (
  <button
    onClick={() => {
      const link = document.createElement('a');
      link.href = "/doctor.pdf";
      link.download = 'واجبات الدكتور تجاه المريض.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }}
    className="bg-primary text-white tajawal-regular md:text-lg text-sm py-2 px-4 rounded hover:bg-primary-dark mt-2 inline-block"
  >
     واجبات الدكتور تجاه المريض.pdf
  </button>
)}

      </div>
      <Tabs>
        <TabPanel label="القادم">
          {notDoneConsultations.length > 0 ? (
            <BookingList
              consultations={notDoneConsultations}
              doctorDetails={doctorDetails}
              role={role}
              isPrevious={false}
            />
          ) : (
            <div className="text-center py-10">
              <p className="text-lg font-bold">لا يوجد حجوزات حالية</p>
              {role !== "Doctor" && (
                <Link
                  href="/booking-Doctor"
                  className="text-primary underline hover:text-primary-dark mt-2 inline-block"
                >
                  احجز الان
                </Link>
              )}
            </div>
          )}
        </TabPanel>
        <TabPanel label="الحجوزات السابقة">
          {doneConsultations?.length > 0 && (
            <BookingList
              consultations={doneConsultations}
              doctorDetails={doctorDetails}
              role={role}
              isPrevious={true}
              onRate={(consultation) => {
                setSelectedConsultation(consultation);
                setShowRatingModal(true);
              }}
            />
          )}
        </TabPanel>
      </Tabs>

      {showRatingModal && selectedConsultation && (
        <RatingModal
          consultationId={selectedConsultation?.id}
          onClose={() => setShowRatingModal(false)}
          onSubmitRating={(rating) => handleRatingSubmit(selectedConsultation.id, rating)}
        />
      )}
    </div>
  );
};

export default MyBookings;
