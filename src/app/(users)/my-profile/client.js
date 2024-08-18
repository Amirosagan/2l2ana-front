"use client";

import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { checkSession } from "@/src/utils/auth";
import FileManagement from "@/src/components/Booking/FileManagement";
import UpdatePhoneNumberForm from "@/src/components/User/UpdatePhoneNumberForm";
import UpdateDoctorForm from "@/src/components/Doctors/UbdateDoctorForm";
const jwt = require("jsonwebtoken");

const MyProfileClient = () => {
  const [role, setRole] = useState("");
  const [doctorId, setDoctorId] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const session = await checkSession();
      if (session && session.session && session.session.role) {
        setRole(session.session.role);

        const token = Cookies.get("authToken");
        if (token) {
          try {
            const decodedToken = jwt.decode(token);
            if (decodedToken && decodedToken.DoctorId) {
              setDoctorId(decodedToken.DoctorId);
            }
          } catch (error) {
            console.error("Failed to decode token:", error);
          }
        }
      }
    };

    if (typeof window !== "undefined") {
      fetchUserRole();
    }
  }, []);

  return (
    <div className="px-4 sm:px-10 lg:mx-20 mb-5">
      <ToastContainer />
      <div className="mt-3 px-4 sm:px-10">
        <h2 className="font-bold text-2xl tajawal-bold">ملفي الشخصي</h2>
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
