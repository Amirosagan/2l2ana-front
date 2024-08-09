"use client";

import { useEffect, useState, useCallback } from "react";
import BookingList from "@/src/components/Doctors/BookingList";
import api from "@/src/utils/api";
import { checkSession } from "@/src/utils/auth"; // Make sure this path is correct
import { TabPanel, Tabs } from "@/components/ui/tabs";

const MyBookings = () => {
  const [notDoneConsultations, setNotDoneConsultations] = useState([]);
  const [doneConsultations, setDoneConsultations] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState({}); // To store fetched doctor details

  const fetchDoctorDetails = async (doctorId) => {
    try {
      const response = await api.get(`/Doctor/${doctorId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching details for doctor ID ${doctorId}:`, error);
      return null;
    }
  };

  const fetchAllDoctorDetails = useCallback(async (consultations) => {
    const doctorIds = [...new Set(consultations.map((consultation) => consultation.doctorId))]; // Get unique doctor IDs
    const doctorDetailsMap = {};
    for (const id of doctorIds) {
      const details = await fetchDoctorDetails(id);
      if (details) {
        doctorDetailsMap[id] = details;
      }
    }
    setDoctorDetails(doctorDetailsMap);
  }, []);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const { session, token } = await checkSession(); // Ensure this function is properly defined and imported
        if (!session || !token) {
          return;
        }

        // Fetch not done consultations
        const notDoneResponse = await api.get("/Consultation/User/NotDoneConsultation", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const notDoneConsultationsData = notDoneResponse.data.consultations;
        setNotDoneConsultations(notDoneConsultationsData);

        // Fetch done consultations
        const doneResponse = await api.get("/Consultation/User/GetDoneConsultation", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const doneConsultationsData = doneResponse.data.consultations;
        setDoneConsultations(doneConsultationsData);

        // Fetch doctor details for all consultations
        const allConsultations = [...notDoneConsultationsData, ...doneConsultationsData];
        await fetchAllDoctorDetails(allConsultations);
      } catch (error) {
        console.error("Error fetching consultations:", error);
      }
    };

    fetchConsultations();
  }, [fetchAllDoctorDetails]);

  return (
    <div className="mt-10">
      <h2 className="text-2xl tajawal-bold">حجوزاتي</h2>
      <Tabs>
        <TabPanel label="القادم">
          <BookingList consultations={notDoneConsultations} doctorDetails={doctorDetails} />
        </TabPanel>
        <TabPanel label="الحجوزات السابقة">
          <BookingList consultations={doneConsultations} doctorDetails={doctorDetails} />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default MyBookings;
