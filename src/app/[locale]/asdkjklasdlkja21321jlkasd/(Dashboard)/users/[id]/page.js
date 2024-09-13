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
          userId: userId,
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
    console.log("Downloading file:", fileId, "with URL:", url);  // Debug log to verify URL
    if (!url) {
      console.error("URL is missing for file download");
      return;
    }

    setTimeout(() => {
      const link = document.createElement("a");
      link.href = url;
      link.download = "";  // Optionally set a filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);
  };

  const handleAddTicket = async (isBigTicket) => {
    if (user && user.id) {
      try {
        const token = Cookies.get("authToken");

        // Define the updated freeTickets based on whether it's a big or regular ticket
        const updatedFreeTickets = isBigTicket
          ? user.bigFreeTickits + 1 // Big ticket: freeTickets = bigFreeTickits + 1
          : user.freeTickits + 1;   // Regular ticket: freeTickets = freeTickits + 1

        // Create the payload for the API
        const payload = {
          userId: user.id,
          freeTickets: updatedFreeTickets, // Send the updated freeTickets in both cases
          isPaid: isBigTicket, // isPaid is true for big tickets, false for regular tickets
        };

        // Send the patch request with the correct payload
        await api.patch(
          `/User/UpdateFreeTickets`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        alert(isBigTicket ? "تمت إضافة 30 دقيقة بنجاح" : "تمت إضافة 10 دقائق بنجاح");

        // Update the local state based on the ticket type
        setUser((prevUser) => ({
          ...prevUser,
          ...(isBigTicket
            ? { bigFreeTickits: prevUser.bigFreeTickits + 1 } // Update bigFreeTickits only for big tickets
            : { freeTickits: prevUser.freeTickits + 1 }) // Update freeTickits only for regular tickets
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
