"use client";

import React from "react";
import AdminPage from "@/src/components/admin/getId/AdminPage";

const QuestionPage = () => {
  const headers = ["Question", "ID", "Last Updated", "Action"];
  return <AdminPage type="questions" apiUrl="/Question" addNewLink="/asdkjklasdlkja21321jlkasd/newQuestion" headers={headers} />;
};

export default QuestionPage;
