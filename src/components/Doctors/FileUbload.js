import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import api from "@/src/utils/api";
import { useTranslations } from "next-intl"; // Importing useTranslations for translations

const FileUpload = ({ user, fetchMedicalFiles }) => {
  const [loading, setLoading] = useState(false);
  const t = useTranslations("FileUpload"); // Using 'FileUpload' namespace for translations

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
      "application/pdf": [".pdf"],
    },
    onDrop: (acceptedFiles) => {
      setLoading(true);
      uploadFiles(acceptedFiles);
    },
  });

  const uploadFiles = async (acceptedFiles) => {
    for (const file of acceptedFiles) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await api.post("/Upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (!response.data) {
          throw new Error(t("uploadFileFailed")); // Translated error message
        }

        const fileUrl = response.data.fileUrl;
        await uploadMedicalFileInfo(file.name, file.type, fileUrl);
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error(t("uploadError"), { // Translated toast error
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
    fetchMedicalFiles(user.session.id, user.token);
    setLoading(false);
  };

  const uploadMedicalFileInfo = async (fileName, contentType, url) => {
    const data = {
      userId: user.session.id,
      fileName,
      contentType,
      url,
    };

    try {
      const response = await api.post("/MedicalFile", data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.data) {
        throw new Error(t("uploadMedicalInfoFailed")); // Translated error message
      }

      toast.success(t("uploadSuccess"), { // Translated success message
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error uploading medical file info:", error);
      toast.error(t("medicalFileInfoError"), { // Translated toast error
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div {...getRootProps()} className="mt-7">
      <input {...getInputProps()} />
      <button
        className="bg-primary text-white px-4 py-2 rounded tajawal-bold hover:bg-primary-dark transition"
        disabled={loading}
      >
        {loading
          ? t("uploadingFiles")
          : t("uploadButton")} 
      </button>
    </div>
  );
};

export default FileUpload;
