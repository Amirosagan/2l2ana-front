import React from "react";
import BaseModal from "./BaseModal";

const NotesModal = ({ onClose, notes }) => {
  return (
    <BaseModal title="ملاحظات الطبيب" onClose={onClose}>
      <p>{notes}</p>
      <button
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded tajawal-bold hover:bg-blue-600 transition"
        onClick={onClose}
      >
        إغلاق
      </button>
    </BaseModal>
  );
};

export default NotesModal;
