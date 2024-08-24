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
const jwt = require("jsonwebtoken");

const MyProfileClient = () => {
  const [role, setRole] = useState("");
  const [doctorId, setDoctorId] = useState(null);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const session = await checkSession();
      if (!session) {
        toast.error("المستخدم غير مصرح له");
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
              setRole(session.session.role); // Setting the role from session data
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
            toast.error("فشل في جلب بيانات المستخدم");
          }
        } catch (error) {
          toast.error("حدث خطأ أثناء جلب بيانات المستخدم");
        }
      }
    };

    if (typeof window !== "undefined") {
      fetchUserData();
    }
  }, []);

  return (
    <div className="px-4 sm:px-10 lg:mx-20 mb-5">
      <ToastContainer />
      <div className="mt-3 px-4 sm:px-10">
          <h2 className="font-bold text-2xl tajawal-bold lg:-mt-2">مرحبا, {firstName}</h2>
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
