"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const UpdateConsultationPrice = ({ doctorId }) => {
  const [consultationPriceBeforeDiscount, setConsultationPriceBeforeDiscount] = useState(0);
  const [consultationPriceAfterDiscount, setConsultationPriceAfterDiscount] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const token = Cookies.get("authToken");
        const response = await fetch(`https://api.2l2ana.com/api/Doctor/${doctorId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch doctor data");
        }

        const doctorData = await response.json();
        setConsultationPriceBeforeDiscount(doctorData.consultationPriceBeforeDiscount);
        setConsultationPriceAfterDiscount(doctorData.consultationPriceAfterDiscount);
      } catch (err) {
        setMessage(`Error fetching doctor data: ${err.message}`);
        console.error("Error fetching doctor data:", err.message);
      }
    };

    fetchDoctorData();
  }, [doctorId]);

  const updateConsultationPrice = async () => {
    try {
      const token = Cookies.get("authToken");

      const response = await fetch(`https://api.2l2ana.com/api/Doctor/UpdateDoctorConsultationPrice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctorId,
          consultationPriceBeforeDiscount,
          consultationPriceAfterDiscount,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update consultation price");
      }

      const result = await response.json();
      setMessage("Consultation price updated successfully.");
      console.log("Updated doctor data:", result);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
      console.error("Error updating consultation price:", err.message);
    }
  };

  return (
    <div className="flex flex-col mt-20 text-base">
      <div dir="rtl">
        <label className=""> السعر قبل الخصم </label>
        <input
          type="number"
          value={consultationPriceBeforeDiscount}
          onChange={(e) => setConsultationPriceBeforeDiscount(Number(e.target.value))}
          placeholder="Price Before Discount"
          className="border p-2 mb-2"
        />
      </div>
      <div className="rtl">
        <label> السعر بعد الخصم </label>
        <input
          type="number"
          value={consultationPriceAfterDiscount}
          onChange={(e) => setConsultationPriceAfterDiscount(Number(e.target.value))}
          placeholder="Price After Discount"
          className="border p-2 mb-2"
        />
      </div>
      <button
        onClick={updateConsultationPrice}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Update Consultation Price
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateConsultationPrice;
