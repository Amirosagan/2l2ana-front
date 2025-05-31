import React from "react";
import AdminPage from "@/src/components/admin/getId/AdminPage";

const ConsultationsPage = () => {
  const headers = ["UserName",  "UserNumber", "Doctor", "Date", "Price","Done from Dr ?" , "pt review" , "Dr review", "dr note for admin" , "meeting url" ];
  return (
    <AdminPage
      type="consultations"
      apiUrl="https://api.mettamena.com/api/Consultation/Admin/GetAllConsultations"
      headers={headers}
    />
  );
};

export default ConsultationsPage;
