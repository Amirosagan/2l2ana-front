import React, { useState } from "react";
import Image from "next/image";
import BaseModal from "./BaseModal";

const Modal = ({ onClose, handleSubmit, uploading }) => {
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFormSubmit = () => {
    handleSubmit(notes, file);
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <BaseModal title="اتمام الكشف" onClose={onClose}>
      <p className="text-gray-600 mt-2">ملحوظة: الملاحظات و الروشته اختياري</p>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="أدخل ملاحظاتك هنا"
        className="w-full border p-2 rounded-md"
      />
      <div className="w-full">
        <label className="block mb-2 text-gray-700">ارفع الروشته:</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full border p-2 rounded-md"
          disabled={uploading}
        />
      </div>
      {file && (
        <div className="mt-4 flex items-center justify-between bg-gray-100 p-4 rounded-md">
          {file.type.startsWith("image/") ? (
            <Image
              width={96}
              height={96}
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="object-cover w-24 h-24 rounded-md"
            />
          ) : (
            <div className="w-24 h-24 flex items-center justify-center bg-gray-300 text-gray-600 rounded-md">
              <span>PDF</span>
            </div>
          )}
          <div className="flex-1 ml-4">
            <p className="font-medium text-gray-800">{file.name}</p>
            <button
              onClick={removeFile}
              className="text-red-500 mt-2 hover:text-red-700"
            >
              إزالة الملف
            </button>
          </div>
        </div>
      )}
      <button
        className="bg-primary text-white py-2 px-4 rounded-md mt-4 w-full hover:bg-primary-dark transition"
        onClick={handleFormSubmit}
        disabled={uploading}
      >
        ارسال
      </button>
    </BaseModal>
  );
};

export default Modal;
