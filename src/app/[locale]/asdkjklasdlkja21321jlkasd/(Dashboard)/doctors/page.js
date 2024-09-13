"use client";

import React from "react";
import AdminPage from "@/src/components/admin/getId/AdminPage";

const DoctorPage = () => {
  const headers = ["Name", "Email", "Doctor ID", "Category", "Rating", "Action"];
  return <AdminPage type="doctors" apiUrl="https://api.2l2ana.com/api/Doctor/GetDoctors" addNewLink="/asdkjklasdlkja21321jlkasd/doctors/newDoctor" headers={headers} />;
};

export default DoctorPage;
