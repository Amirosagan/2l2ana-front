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
        fetchUserDetails(userId, token);
        fetchMedicalFiles(userId, token);
      }
    };

    if (typeof window !== "undefined") {
      verifySession();
    }
  }, [userId]);

  const fetchUserDetails = async (userId, token) => {
    try {
      const response = await api.get(`/User/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      });

      if (response.data) {
        const { id, firstName, lastName, phoneNumber, freeTickits, bigFreeTickits } = response.data;
        setUser({ id, firstName, lastName, phoneNumber, freeTickits, bigFreeTickits });
      } else {
        throw new Error("Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

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

  const handleDownloadFile = async (fileId, url) => {
    try {
      const token = Cookies.get("authToken");
      const response = await api.get(`/MedicalFile/Download/${fileId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob", // To handle the download as a file
      });

      const blob = new Blob([response.data], { type: response.data.type });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", fileId); // Optionally, set a custom filename
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleAddTicket = async (isBigTicket) => {
    if (user && user.id) {
      try {
        const token = Cookies.get("authToken");
        const updatedFreeTickets = user.freeTickits + (isBigTicket ? 0 : 1);
        const updatedBigFreeTickets = user.bigFreeTickits + (isBigTicket ? 1 : 0);

        await api.patch(
          `/User/UpdateFreeTickets`,
          {
            userId: user.id,
            freeTickets: updatedFreeTickets,
            bigFreeTickits: updatedBigFreeTickets,
            isPaid: isBigTicket,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        alert(isBigTicket ? "تمت إضافة 30 دقيقة بنجاح" : "تمت إضافة 10 دقائق بنجاح");

        setUser((prevUser) => ({
          ...prevUser,
          freeTickits: updatedFreeTickets,
          bigFreeTickits: updatedBigFreeTickets,
        }));
      } catch (error) {
        console.error("Error adding ticket:", error);
        alert("حدث خطأ أثناء إضافة التذكرة. حاول مرة أخرى.");
      }
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl mb-5">User Medical Files</h1>

      {user ? (
        <div className="mb-5">
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
          <div className="flex gap-3 items-center mt-10">
            <p><strong>Free Tickets (10min):</strong> {user.freeTickits}</p>
            <p><strong>Big Free Tickets (30min):</strong> {user.bigFreeTickits}</p>
            <button
              className="tajawal-regular bg-primary p-3 rounded-lg"
              onClick={() => handleAddTicket(false)}
            >
              Add 10-minute free ticket
            </button>
            <button
              className="tajawal-regular bg-primary p-3 rounded-lg"
              onClick={() => handleAddTicket(true)}
            >
              Add 30-minute free ticket
            </button>
          </div>
        </div>
      ) : (
        <div>Loading user details...</div>
      )}

      <h1 className="mt-20"> Medical Files: </h1>
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
