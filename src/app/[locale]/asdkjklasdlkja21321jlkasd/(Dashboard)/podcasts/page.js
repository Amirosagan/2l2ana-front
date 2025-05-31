"use client";

import React from "react";
import AdminPage from "@/src/components/admin/getId/AdminPage";

const PodcastPage = () => {
  const headers = ["Title", "Tags", "ID", "Audio URL", "Action"];
  return (
    <AdminPage
      type="podcasts"
      apiUrl="https://mettamena.runasp.net/api/Podcast"
      addNewLink="/asdkjklasdlkja21321jlkasd/newPodcast"
      headers={headers}
    />
  );
};

export default PodcastPage;
