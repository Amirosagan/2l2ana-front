import React, { useState } from "react";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslations } from "next-intl"; // Importing useTranslations for translations

const FilePreview = ({ medicalFiles, onRemoveFile, onDownloadFile }) => {
  const t = useTranslations("FilePreview"); // Using 'FilePreview' namespace for translations
  const [modalImage, setModalImage] = useState(null);
  const [downloadLoading, setDownloadLoading] = useState({});

  const handleImageClick = (url) => {
    setModalImage(url);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const handleDownload = (fileId, url) => {
    setDownloadLoading((prevState) => ({ ...prevState, [fileId]: true }));

    // Open the file in a new tab/window
    window.open(url, "_blank");

    setDownloadLoading((prevState) => ({ ...prevState, [fileId]: false }));
  };

  return (
    <div className="mt-4 flex flex-wrap gap-4 justify-center">
      {medicalFiles.map((file, index) => (
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
              unoptimized={true}
              onClick={() => handleImageClick(file.url)}
            />
          ) : (
            <div className="h-40 w-full flex items-center justify-center bg-gray-200 rounded">
              <span className="text-gray-600">{t("pdfFile")}: {file.fileName}</span> {/* Translated PDF label */}
            </div>
          )}
          <button
            onClick={() => onRemoveFile(file.id)}
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
              t("download") // Translated download button text
            )}
          </button>
        </div>
      ))}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <Image
            width={500}
            height={500}
            src={modalImage}
            alt={t("fullSize")} // Translated alt text
            className="max-w-full max-h-full"
            unoptimized={true}
          />
        </div>
      )}
    </div>
  );
};

export default FilePreview;
