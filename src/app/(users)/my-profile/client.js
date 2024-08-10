"use client";

import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { checkSession } from "@/src/utils/auth";
import MyBooking from "@/src/components/Doctors/MyBooking";
import UpdateDoctorForm from "@/src/components/Doctors/UbdateDoctorForm";
import FileUpload from "@/src/components/Doctors/FileUbload";
import { ChevronDownIcon, ChevronUp } from "lucide-react";
const jwt = require("jsonwebtoken");

const MyProfileClient = () => {
  const [role, setRole] = useState("");
  const [doctorId, setDoctorId] = useState(null);
  const [isSectionOpen, setIsSectionOpen] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      const session = await checkSession();
      if (session && session.session && session.session.role) {
        setRole(session.session.role);
        setIsSectionOpen(session.session.role === "Doctor");

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

  const handleFetchMedicalFiles = (isEmpty) => {
    if (isEmpty) {
      setIsSectionOpen(true);
    }
  };

  const toggleSection = () => {
    setIsSectionOpen(!isSectionOpen);
  };

  return (
    <div className="mt-12 px-4 sm:px-10 lg:mx-20 mb-5">
      <ToastContainer />
      <div className="mt-10 px-4 sm:px-10">
        <div
          className="flex items-center cursor-pointer"
          onClick={toggleSection}
        >
          <h2 className="font-bold text-2xl tajawal-bold">ملفي الشخصي</h2>
          {isSectionOpen ? (
            <ChevronUp className="mt-1 mx-2" />
          ) : (
            <ChevronDownIcon className="mt-1 mx-2 " />
          )}
        </div>
        <div
          className={`transition-all duration-300 ${isSectionOpen ? "max-h-full opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
        >
          {role === "Doctor" ? (
            <UpdateDoctorForm doctorId={doctorId} />
          ) : (
            <FileUpload onFetchMedicalFiles={handleFetchMedicalFiles} />
          )}
        </div>
        <MyBooking />
      </div>
    </div>
  );
};

export default MyProfileClient;
