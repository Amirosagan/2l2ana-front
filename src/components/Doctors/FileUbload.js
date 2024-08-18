import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import api from "@/src/utils/api";

const FileUpload = ({ user, fetchMedicalFiles }) => {
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
      "application/pdf": [".pdf"],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length <= 3) {
        setLoading(true);
        uploadFiles(acceptedFiles);
      } else {
        toast.error("يمكنك تحميل ما يصل إلى 3 ملفات فقط", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
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
          throw new Error("Failed to upload file");
        }

        const fileUrl = response.data.fileUrl;
        await uploadMedicalFileInfo(file.name, file.type, fileUrl);
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("خطأ في تحميل الملف.", {
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
        throw new Error("Failed to upload medical file info");
      }

      toast.success("تم تحميل الملف الطبي بنجاح.", {
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
      toast.error("خطأ في تحميل بيانات الملف الطبي.", {
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
          ? "جاري تحميل الملفات ..."
          : "رفع ملفات (حتى 3 صور أو ملفات PDF)"}
      </button>
    </div>
  );
};

export default FileUpload;
