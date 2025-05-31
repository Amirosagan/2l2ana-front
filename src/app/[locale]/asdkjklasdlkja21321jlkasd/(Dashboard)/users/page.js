"use client";

import React from "react";
import AdminPage from "@/src/components/admin/getId/AdminPage";

const UserPage = () => {
  const headers = ["Name", "Email", "ID", "Phone Number", "Action"];
  return (
    <AdminPage
      type="users"
      apiUrl="https://api.mettamena.com/api/User"
      headers={headers}
    />
  );
};

export default UserPage;
