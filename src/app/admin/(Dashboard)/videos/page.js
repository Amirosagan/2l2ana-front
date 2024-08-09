"use client";

import React from "react";
import AdminPage from "@/src/components/admin/getId/AdminPage";

const VideoPage = () => {
  const headers = ["Title", "Tags", "ID", "Created At", "Action"];
  return <AdminPage type="videos" apiUrl="http://localhost:8080/api/Youtube" addNewLink="/admin/newVideo" headers={headers} />;
};

export default VideoPage;
