import React from "react";
import AdminPage from "@/src/components/admin/getId/AdminPage";

const ConsultationsPage = () => {
  const headers = ["User", "Doctor", "Date", "Price", "Status", "Meeting"];
  return (
    <AdminPage
      type="consultations"
      apiUrl="https://api.2l2ana.com/api/Consultation/Admin/GetAllConsultations"
      headers={headers}
    />
  );
};

export default ConsultationsPage;
