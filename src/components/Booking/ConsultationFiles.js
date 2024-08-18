import React from "react";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";

const ConsultationFiles = ({ files, downloadLoading, handleDownloadFile }) => {
  return (
    <div className="mt-4">
      <h3 className="tajawal-bold text-md mb-2">ملفات الحالة:</h3>
      <div className="flex flex-wrap gap-2">
        {files.map((file, index) => (
          <div key={index} className="relative w-24 h-36 flex flex-col items-center justify-between border rounded-md p-2">
            <div className="w-full h-full flex items-center justify-center bg-gray-200 overflow-hidden">
              {file.contentType.startsWith("image/") ? (
                <Image
                  width={80}
                  height={80}
                  src={file.url}
                  alt={file.fileName}
                  className="object-cover"
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  unoptimized={true}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-sm text-gray-600">PDF</span>
                </div>
              )}
            </div>
            <button
              onClick={() => handleDownloadFile(file.id, file.url)}
              className="bg-primary text-white px-2 py-1 rounded tajawal-bold hover:bg-primary-dark transition mt-2"
              disabled={downloadLoading[file.id]}
            >
              {downloadLoading[file.id] ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                "تحميل"
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultationFiles;
