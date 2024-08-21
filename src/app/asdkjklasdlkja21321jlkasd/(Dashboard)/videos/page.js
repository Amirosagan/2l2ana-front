"use client";

import React from "react";
import AdminPage from "@/src/components/admin/getId/AdminPage";

const VideoPage = () => {
  const headers = ["Title", "Tags", "ID", "Created At", "Action"];
  return (
    <AdminPage
      type="videos"
      apiUrl="https://api.2l2ana.com/api/Youtube"
      addNewLink="/asdkjklasdlkja21321jlkasd/newVideo"
      headers={headers}
    />
  );
};

export default VideoPage;
