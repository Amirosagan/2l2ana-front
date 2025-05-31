"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl'; 
import BookingList from "@/src/components/Booking/BookingList";
import api from "@/src/utils/api";
import { checkSession } from "@/src/utils/auth";
import { TabPanel, Tabs } from "@/components/ui/tabs";
import RatingModal from "@/src/components/Booking/RatingModal";
import { Link } from '@/src/i18n/routing';
import { toast, ToastContainer } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css';

const MyBookings = () => {
  const t = useTranslations('MyBookings');
  const router = useRouter(); 
  const [notDoneConsultations, setNotDoneConsultations] = useState([]);
  const [doneConsultations, setDoneConsultations] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState({});
  const [role, setRole] = useState("");
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [token, setToken] = useState(null);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const success = new URLSearchParams(window.location.search).get('success');
      if (success === "true") {
        toast.success(t('operationSuccess')); // Use translation key
      } else if (success === "false") {
        toast.error(t('operationFailed')); // Use translation key
      }
    }
  }, [t]); 

  useEffect(() => {
    const fetchConsultations = async () => {
      const { session, token } = await checkSession();
      if (!session || !token) {
        console.error(t('userNotAuthenticated')); // Translated message
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
        setDoneConsultations(doneResponse.data.consultations || []);
      } catch (error) {
        console.error(t('fetchFailed'), error); // Translated error message
        setNotDoneConsultations([]);
        setDoneConsultations([]);
      }

      setIsDataFetched(true);
    };

    if (!isDataFetched) {
      fetchConsultations();
    }
  }, [isDataFetched, t]);

  const fetchDoctorDetails = useCallback(
    async (doctorId) => {
      try {
        const response = await api.get(`/Doctor/${doctorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
      } catch (error) {
        console.error(t('fetchDoctorFailed', { doctorId }), error); // Translated error with interpolation
        return null;
      }
    },
    [token, t]
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
        ...(doneConsultations || []),
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
      console.error(t('ratingFailed'), error); // Translated message for failed rating
    }
  };

  return (
    <div className="mt-10"  >
      <ToastContainer />
      <div className="flex items-center flex-col md:flex-row gap-3 justify-between">
        <h2 className="text-2xl mx-5 tajawal-bold">{t('myBookings')}</h2> {/* Translated header */}
        <div className="flex flex-col gap-1">
          {role === "Doctor" && (
            <button
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/doc.pdf";
                link.download = t('doctorDuties'); // Translated file name
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="bg-primary text-white tajawal-regular md:text-lg text-sm py-2 px-4 rounded hover:bg-primary-dark mt-2 inline-block"
            >
              {t('doctorDuties')}
            </button>
          )}
          {role === "Doctor" && (
            <div className="w-full">
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/Dr.consent.pdf";
                  link.download = t('medicalConsent'); // Translated file name
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="bg-primary text-white w-full tajawal-regular md:text-lg text-sm py-2 px-4 rounded hover:bg-primary-dark mt-2 inline-block"
              >
                {t('medicalConsent')}
              </button>
              <h1 className="tajawal-regular">
                {t('doctorConsentNote')}
              </h1> {/* Translated message */}
            </div>
          )}
        </div>
        {role !== "Doctor" && (
          <div dir="ltr">
            <button
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/Patientconsent.pdf";
                link.download = t('medicalConsent'); // Translated file name
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="bg-primary text-white tajawal-regular md:text-lg text-sm py-2 px-4 rounded hover:bg-primary-dark mt-2 inline-block"
            >
              {t('medicalConsent')}
            </button>
            <h1 className="tajawal-regular">
              {t('patientConsentNote')} {/* Translated message */}
            </h1>
          </div>
        )}
      </div>
      <Tabs>
        <TabPanel label={t('upcoming')}>
          
          {notDoneConsultations.length > 0 ? (
            <BookingList
              consultations={notDoneConsultations}
              doctorDetails={doctorDetails}
              role={role}
              isPrevious={false}
            />
          ) : (
            <div className="text-center py-10" >
              <p className="text-lg font-bold">{t('noUpcomingBookings')}</p> {/* Translated */}
              {role !== "Doctor" && (
                <Link
                  href="/booking-Doctor"
                  className="text-primary underline hover:text-primary-dark mt-2 inline-block"
                >
                  {t('bookNow')} {/* Translated */}
                </Link>
              )}
            </div>
          )}
        </TabPanel>
        <TabPanel label={t('pastBookings')}>
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
          <p className="mx-5">{t('helpMessage')} <a href="https://wa.me/201210684419" className="text-accent underline" target="_blank" rel="noopener noreferrer">WhatsApp</a></p> {/* Translated help message */}
    </div>
  );
};

export default MyBookings;
