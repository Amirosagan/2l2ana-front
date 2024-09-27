import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "@/src/utils/api";
import Cookies from "js-cookie";
import { checkSession } from "@/src/utils/auth";
import { useTranslations } from "next-intl"; // Importing useTranslations

const UpdatePhoneNumberForm = () => {
  const t = useTranslations('UpdatePhoneNumberForm'); // Using 'UpdatePhoneNumberForm' namespace for translations
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    profilePicture: "",
  });
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const sessionData = await checkSession();

      if (!sessionData) {
        toast.error(t("unauthorizedUser")); // Translated error message
        return;
      }

      const userId = sessionData.session.id;

      try {
        const response = await api.get(`/User/${userId}`, {
          headers: {
            Authorization: `Bearer ${sessionData.token}`,
          },
        });

        if (response.status === 200) {
          setProfileData({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            phoneNumber: response.data.phoneNumber,
            profilePicture: response.data.profilePicture,
          });
        } else {
          toast.error(t("fetchUserFailed")); // Translated error message
        }
      } catch (error) {
        toast.error(t("fetchUserError")); // Translated error message
      }
    };

    fetchUserData();
  }, [t]);

  const handleUpdate = async () => {
    const token = Cookies.get("authToken");

    if (profileData.phoneNumber.length < 5) {
      toast.warn(t("phoneNumberMinLength")); // Translated warning message
      return;
    }

    if (!token) {
      toast.error(t("unauthorizedUser")); // Translated error message
      return;
    }

    try {
      const response = await api.put(
        `/User`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success(t("phoneNumberUpdateSuccess")); // Translated success message
        setIsEditable(false);
      } else {
        toast.error(t("phoneNumberUpdateFailed")); // Translated error message
      }
    } catch (error) {
      toast.error(t("phoneNumberUpdateError")); // Translated error message
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  return (
    <div className="mt-5">
      <h3 className="tajawal-bold text-xl text-gray-700 mb-2">
        {t('updatePhoneNumber')} {/* Translated label */}
      </h3>
      <input
        type="text"
        name="phoneNumber"
        value={profileData.phoneNumber}
        onChange={handleChange}
        className={`input mb-3 w-full px-4 py-2 rounded tajawal-bold transition ${
          isEditable ? "bg-white border border-gray-300" : "bg-gray-200 border border-gray-400 cursor-not-allowed"
        }`}
        disabled={!isEditable}
      />
      {!isEditable ? (
        <button onClick={handleEditClick} className="bg-primary text-white px-4 py-2 rounded tajawal-bold hover:bg-primary-dark transition w-full">
          {t('editPhoneNumber')} {/* Translated button */}
        </button>
      ) : (
        <button onClick={handleUpdate} className="bg-primary text-white px-4 py-2 rounded tajawal-bold hover:bg-primary-dark transition w-full">
          {t('updatePhoneNumber')} {/* Translated button */}
        </button>
      )}
    </div>
  );
};

export default UpdatePhoneNumberForm;
