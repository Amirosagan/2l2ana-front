"use client";

import React from "react";
import AdminPage from "@/src/components/admin/getId/AdminPage";

const BlogPage = () => {
  const headers = ["Title", "ID", "Last Updated", "Action"];
  return <AdminPage type="blogs" apiUrl="/Post" addNewLink="/asdkjklasdlkja21321jlkasd/newBlog" headers={headers} />;
};

export default BlogPage;
