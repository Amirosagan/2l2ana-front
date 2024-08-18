import React from "react";
import { X } from "lucide-react";

const BaseModal = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-5 w-full max-w-lg mx-2 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="text-center mb-4">
          <h2 className="tajawal-bold text-xl">{title}</h2>
        </div>
        <div className="modal-content space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BaseModal;
