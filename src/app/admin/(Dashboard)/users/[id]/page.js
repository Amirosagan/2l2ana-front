"use client";

import React, { useEffect, useState } from "react";
import api from '@/src/utils/api';
import { useRouter } from 'next/router';
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleDoctorPage = ({ id }) => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  const doctorId = router.query.id || id;

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await api.get(`/Doctor/${doctorId}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('authToken')}`,
          },
        });
        setDoctor(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch doctor data");
        setLoading(false);
      }
    };

    if (doctorId) {
      fetchDoctor();
    }
  }, [doctorId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!doctor) {
    return <div>No doctor data found</div>;
  }

  return (
    <div className="py-5 px-7 mt-5 bg-white rounded-lg shadow-lg border-solid border w-[90%] m-auto grid grid-cols-1 md:grid-cols-2 gap-4">
      <ToastContainer />
      <div className="form-container bg-white p-5 rounded-lg shadow-lg border-solid border">
        <form action="" className="flex flex-col form2">
          <input type="hidden" name="id" value={doctor.doctorId} />
          <label>Name</label>
          <input type="text" name="name" placeholder={doctor.name} defaultValue={doctor.name} />
          <label>Description</label>
          <input type="text" name="description" placeholder={doctor.description} defaultValue={doctor.description} />
          <label>Headline</label>
          <input type="text" name="headline" placeholder={doctor.headLine} defaultValue={doctor.headLine} />
          <label>Category</label>
          <input type="text" name="category" placeholder={doctor.category} defaultValue={doctor.category} />
          <label>Price</label>
          <input type="text" name="price" placeholder={doctor.consultationPrice} defaultValue={doctor.consultationPrice} />
          <label>Rating</label>
          <input type="text" name="rating" placeholder={doctor.rating} defaultValue={doctor.rating} />
          <label>Is Active?</label>
          <select name="isActive" defaultValue={doctor.isActive}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <button className="w-full bg-admin1 text-white font-bold h-16 rounded-lg hover:bg-admin1/70">Update</button>
        </form>
      </div>
      <div className="image-container p-5">
        <Image src={doctor.imageUrl} alt={doctor.name} width={300} height={300} className="rounded-lg" />
      </div>
    </div>
  );
};

export default SingleDoctorPage;
