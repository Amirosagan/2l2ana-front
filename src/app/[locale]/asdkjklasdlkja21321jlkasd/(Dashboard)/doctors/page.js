"use client";

import React from "react";
import AdminPage from "@/src/components/admin/getId/AdminPage";

const DoctorPage = () => {
  const headers = ["Name", "Email", "Doctor ID", "Category", "Rating", "Action"];
  return <AdminPage type="doctors" apiUrl="https://mettamena.runasp.net/api/Doctor/GetDoctors" addNewLink="/asdkjklasdlkja21321jlkasd/doctors/newDoctor" headers={headers} />;
};

export default DoctorPage;
