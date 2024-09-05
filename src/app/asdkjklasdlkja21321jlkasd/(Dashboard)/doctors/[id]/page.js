'use client';

import { useState } from "react";
import UpdateConsultationPrice from "@/src/components/admin/UpdateConsultationPrice";
import Image from "next/image";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { toast } from "react-toastify";
import Cookies from "js-cookie"; // Assuming you're using cookies for token storage

const SingleDoctorPage = ({ params }) => {
  const { id } = params;
  const [doctorData, setDoctorData] = useState(null);
  const [error, setError] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const fetchDoctorData = async () => {
    try {
      const response = await fetch(`https://api.2l2ana.com/api/Doctor/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`, // Retrieve the token from cookies
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch doctor data");
      }

      const data = await response.json();
      setDoctorData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch doctor data when the component mounts
  useState(() => {
    fetchDoctorData();
  }, []);

  const handleDeleteDoctor = async () => {
    try {
      const token = Cookies.get("authToken"); // Get token from cookies

      const response = await axios.delete(`https://api.2l2ana.com/api/Doctor/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success("تم حذف الدكتور");
        setShowDeleteDialog(false);
      }
    } catch (error) {
      toast.error("فشل في حذف الدكتور");
    }
  };

  const confirmDeleteDoctor = () => {
    setShowDeleteDialog(true);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!doctorData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-5 px-7 mt-5 bg-white rounded-lg shadow-lg border-solid border w-[90%] m-auto grid grid-cols-1 md:grid-cols-2 gap-4">
      <Image
        src={doctorData.imageUrl}
        alt={doctorData.name}
        width={200}
        height={200}
        unoptimized={true}
      />
      <div>
        <h1>{doctorData.name}</h1>
        <p>{doctorData.description}</p>
        <p>{doctorData.headLine}</p>
        <p>Category: {doctorData.category}</p>
        <p>
          Rating: {doctorData.rating} ({doctorData.ratingCount} reviews)
        </p>
        <p>Consultation Price: ${doctorData.consultationPrice}</p>
        <p>{doctorData.isActive ? "Active" : "Inactive"}</p>

        <UpdateConsultationPrice doctorId={id} />

        <button
          className="mt-5 bg-red-500 text-white py-2 px-4 rounded-md"
          onClick={confirmDeleteDoctor}
        >
          حذف الدكتور
        </button>

        {/* Delete Confirmation Dialog */}
        <Dialog  maxWidth="md" open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
          <DialogTitle>تأكيد الحذف</DialogTitle>
          <DialogContent>
            <p>هل تريد حذف الدكتور؟</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDeleteDialog(false)}>إلغاء</Button>
            <Button onClick={handleDeleteDoctor} color="error">
              نعم، احذف
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default SingleDoctorPage;
