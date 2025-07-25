"use client";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { checkSession } from "@/src/utils/auth";
import api from "@/src/utils/api";
import FileManagement from "@/src/components/Booking/FileManagement";
import UpdatePhoneNumberForm from "@/src/components/User/UpdatePhoneNumberForm";
import UpdateDoctorForm from "@/src/components/Doctors/UbdateDoctorForm";
import { useLocale, useTranslations } from "next-intl";
const jwt = require("jsonwebtoken");

const MyProfileClient = () => {
  const [role, setRole] = useState("");
  const [doctorId, setDoctorId] = useState(null);
  const [firstName, setFirstName] = useState("");

  const t = useTranslations('MyProfile'); // Translations for the toast messages
  const locale = useLocale(); // Get current locale

  useEffect(() => {
    const fetchUserData = async () => {
      const session = await checkSession();
      if (!session) {
        toast.error(t("unauthorizedUser")); // Translated error message
        return;
      }

      const userId = session.session.id;
      const token = Cookies.get("authToken");

      if (token) {
        try {
          const decodedToken = jwt.decode(token);
          if (decodedToken) {
            if (decodedToken.DoctorId) {
              setDoctorId(decodedToken.DoctorId);
            }
            if (decodedToken.firstName) {
              setFirstName(decodedToken.firstName);
            }
            if (session.session.role) {
              setRole(session.session.role);
            }
          }

          const response = await api.get(`/User/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            setFirstName(response.data.firstName);
          } else {
            toast.error(t("fetchUserFailed")); // Translated error message
          }
        } catch (error) {
          toast.error(t("fetchUserError")); // Translated error message
        }
      }
    };

    if (typeof window !== "undefined") {
      fetchUserData();
    }
  }, [t]); // Add t (translation) as a dependency

  return (
    <div className="px-4 sm:px-10 lg:mx-20 mb-5">
      <ToastContainer />
      <div className="mt-3 px-4 sm:px-10">
        {/* Show greeting based on locale */}
        <h2 className="font-bold text-2xl tajawal-bold lg:-mt-2">
          {locale === 'ar' ? `مرحبا, ${firstName}` : `Hello, ${firstName}`}
        </h2>

        {role === "Doctor" ? (
          <UpdateDoctorForm doctorId={doctorId} />
        ) : (
          <>
            <FileManagement />
            <UpdatePhoneNumberForm />
          </>
        )}
      </div>
    </div>
  );
};

export default MyProfileClient;
