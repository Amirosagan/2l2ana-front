"use client";

import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Typography from "@mui/material/Typography";
import { AlertCircle } from "lucide-react";
import { checkSession } from "@/src/utils/auth";
import api from "@/src/utils/api";
import FilePreview from "./FilePreview";
import FileUpload from "../Doctors/FileUbload";
import { toast } from "react-toastify";

const FileManagement = () => {
  const [medicalFiles, setMedicalFiles] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const verifySession = async () => {
      const { session, token } = await checkSession();
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
      } else {
        throw new Error("Failed to fetch medical files");
      }
    } catch (error) {
      console.error("Error fetching medical files:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleRemoveFile = async (fileId) => {
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

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
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
          <div className="mx-2 mt-2 md:mt-0">
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

      <FileUpload user={user} fetchMedicalFiles={fetchMedicalFiles} />

      {isFetching ? (
        <div className="mt-4">Loading...</div>
      ) : (
        <FilePreview
          medicalFiles={medicalFiles}
          onRemoveFile={handleRemoveFile}
          onDownloadFile={handleDownloadFile}
        />
      )}
    </div>
  );
};

export default FileManagement;
