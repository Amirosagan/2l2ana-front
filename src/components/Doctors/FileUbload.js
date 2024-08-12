"use client";

import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { AlertCircle } from "lucide-react";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { toast } from "react-toastify";
import { checkSession } from "@/src/utils/auth";
import api from "@/src/utils/api";
import CircularProgress from "@mui/material/CircularProgress";

const FileUpload = ({ onFetchMedicalFiles }) => {
  const [medicalFiles, setMedicalFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState({});
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      const { session, token } = await checkSession();
      setIsLoggedIn(!!session);
      if (session) {
        setUser({ session, token });
        fetchMedicalFiles(session.id, token);
      }
    };

    if (typeof window !== "undefined") {
      verifySession();
    }
  }, []);

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
        onFetchMedicalFiles(response.data.medicalFiles.length === 0); // Notify the parent if the list is empty
      } else {
        throw new Error("Failed to fetch medical files");
      }
    } catch (error) {
      console.error("Error fetching medical files:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
      "application/pdf": [".pdf"],
    },
    onDrop: (acceptedFiles) => {
      if (medicalFiles.length + acceptedFiles.length <= 3) {
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
    if (!isLoggedIn || !user) {
      toast.error("يجب عليك تسجيل الدخول لتحميل الملفات.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

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

  const removeFile = async (fileId) => {
    try {
      const response = await api.delete(`/MedicalFile/${fileId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.status === 200) {
        setMedicalFiles(medicalFiles.filter((file) => file.id !== fileId));
        toast.success("تم حذف الملف بنجاح.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        throw new Error("Failed to delete file");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("خطأ في حذف الملف.", {
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

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const handleDownload = (fileId, url) => {
    setDownloadLoading((prevState) => ({ ...prevState, [fileId]: true }));
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = url;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadLoading((prevState) => ({ ...prevState, [fileId]: false }));
    }, 1000);
  };

  const handleImageClick = (url) => {
    setModalImage(url);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="border-2 rounded-md p-4 mt-5 text-center">
      <h1 className="tajawal-bold text-xl sm:text-2xl mt-4 text-gray-400 flex items-center justify-center text-center flex-wrap">
        احتفظ بكل{" "}
        <span className="tajawal-extrabold mx-2 text-primary">
          بياناتك الصحية
        </span>{" "}
        في مكان واحد بكل سهولة وأمان
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <div className="mx-2">
            <Tooltip
              title={
                <Typography variant="body2" sx={{ p: 1 }}>
                  بياناتك الطبية مؤمنة بالكامل. لا يمكن لأحد رؤيتها إلا عند
                  الاشتراك مع أحد الأطباء، وهو الوحيد الذي يستطيع الاطلاع عليها.
                </Typography>
              }
              open={open}
              onClose={handleTooltipClose}
              disableFocusListener
              disableTouchListener
              placement="top"
              arrow
            >
              <AlertCircle
                className="cursor-pointer text-primary hover:text-primary-dark"
                onClick={handleTooltipOpen}
                onMouseEnter={handleTooltipOpen}
              />
            </Tooltip>
          </div>
        </ClickAwayListener>
      </h1>
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
      <div className="mt-4 flex flex-wrap gap-4 justify-center">
        {isFetching
          ? Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="relative w-48 h-64 border rounded-md p-2 flex flex-col items-center justify-center"
              >
                <div className="w-24 h-24 bg-gray-300 animate-pulse rounded"></div>
                <div className="mt-2 w-32 h-4 bg-gray-300 animate-pulse rounded"></div>
              </div>
            ))
          : medicalFiles.map((file, index) => (
              <div
                key={index}
                className="relative w-48 h-64 border rounded-md p-2 flex flex-col items-center justify-between overflow-hidden"
              >
                {file.contentType.startsWith("image/") ? (
                  <Image
                    width={192}
                    height={256}
                    src={file.url}
                    alt={file.fileName}
                    className="object-cover w-full h-40"
                    onClick={() => handleImageClick(file.url)}
                  />
                ) : (
                  <div className="h-40 w-full flex items-center justify-center bg-gray-200 rounded">
                    <span className="text-gray-600">PDF: {file.fileName}</span>
                  </div>
                )}
                <button
                  onClick={() => removeFile(file.id)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700 transition"
                >
                  &times;
                </button>
                <button
                  onClick={() => handleDownload(file.id, file.url)}
                  className="bg-primary text-white px-4 py-2 rounded tajawal-bold hover:bg-primary-dark transition mt-2"
                  disabled={downloadLoading[file.id]}
                >
                  {downloadLoading[file.id] ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "تحميل"
                  )}
                </button>
              </div>
            ))}
      </div>
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <Image
            width={500}
            height={500}
            src={modalImage}
            alt="Full Size"
            className="max-w-full max-h-full"
            unoptimized={true}

          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
