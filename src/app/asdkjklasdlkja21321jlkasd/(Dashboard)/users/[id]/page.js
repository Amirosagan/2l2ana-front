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
        fetchUserDetails(userId, token); // Fetch user details
        fetchMedicalFiles(userId, token); // Fetch medical files
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
        const { id, firstName, lastName, phoneNumber, freeTickits } = response.data;
        setUser({ id, firstName, lastName, phoneNumber, freeTickits });
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

  const handleAddFreeTicket = async () => {
    if (user && user.id) {
      try {
        const token = Cookies.get("authToken");
        const updatedFreeTickets = user.freeTickits + 1;

        await api.patch(
          `/User/UpdateFreeTickets`,
          { userId: user.id, freeTickets: updatedFreeTickets },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Show success alert
        alert("تمت الاضافة بنجاح");

        // Update the user state to reflect the new number of free tickets
        setUser((prevUser) => ({
          ...prevUser,
          freeTickits: updatedFreeTickets,
        }));
      } catch (error) {
        console.error("Error adding free ticket:", error);
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
            <p><strong>Free Tickets:</strong> {user.freeTickits}</p>  
            <button
              className="tajawal-regular bg-primary p-3 rounded-lg"
              onClick={handleAddFreeTicket}
            >
              Add free ticket
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
