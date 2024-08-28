"use client";

import React, { useEffect, useState } from "react";
import api from "@/src/utils/api";
import Cookies from "js-cookie";
import FilePreview from "@/src/components/Booking/FilePreview";

const UserSinglePage = ({ params }) => {
  const { id: userId } = params;
  const [medicalFiles, setMedicalFiles] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifySession = async () => {
      const token = Cookies.get("authToken");
      if (userId && token) {
        setUser({ userId, token });
        fetchMedicalFiles(userId, token);
      }
    };

    if (typeof window !== "undefined") {
      verifySession();
    }
  }, [userId]);

  const fetchMedicalFiles = async (userId, token) => {
    try {
      const response = await api.get(`/MedicalFile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
        params: {
          UserId: userId,
        },
      });

      if (response.data && Array.isArray(response.data.medicalFiles)) {
        setMedicalFiles(response.data.medicalFiles);
      } else {
        throw new Error("Failed to fetch medical files");
      }
    } catch (error) {
      console.error("Error fetching medical files:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleDownloadFile = (fileId, url) => {
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = url;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl mb-5">User Medical Files</h1>

      {isFetching ? (
        <div>Loading medical files...</div>
      ) : medicalFiles.length > 0 ? (
        <FilePreview
          medicalFiles={medicalFiles}
          onDownloadFile={handleDownloadFile}
        />
      ) : (
        <p>No medical files available.</p>
      )}
    </div>
  );
};

export default UserSinglePage;
