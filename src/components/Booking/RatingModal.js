import React, { useState, useEffect } from "react";
import api from "@/src/utils/api";
import { checkSession } from "@/src/utils/auth";
import BaseModal from "./BaseModal";
import StarRating from "./StarRating";

const RatingModal = ({ onClose, consultationId, onSubmitRating }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getSessionToken = async () => {
      const { token } = await checkSession();
      if (token) {
        setToken(token);
      } else {
        console.error("Session is invalid or expired. Please log in again.");
      }
    };
    getSessionToken();
  }, []);

  const handleSubmit = async () => {
    if (!token) {
      console.error("Token is missing.");
      return;
    }

    setIsSubmitting(true);

    try {
      await api.post(
        "/Consultation/Rate",
        {
          consultationId,
          rating,
          comment,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onSubmitRating(rating);
      onClose();
    } catch (error) {
      console.error("Failed to submit rating:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BaseModal title="تقييم الكشف" onClose={onClose}>
      <StarRating
        rating={rating}
        hoverRating={hoverRating}
        onClick={(rate) => setRating(rate)}
        onHover={(rate) => setHoverRating(rate)}
        onMouseLeave={() => setHoverRating(0)}
      />

      <textarea
        className="w-full p-2 border rounded-md focus:outline-none focus:border-primary"
        placeholder="أضف تعليقك هنا"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
      ></textarea>

      <button
        className="bg-primary text-white py-2 px-4 rounded-md mt-4 w-full hover:bg-primary-dark transition"
        onClick={handleSubmit}
        disabled={isSubmitting || rating === 0 || comment.trim() === ""}
      >
        {isSubmitting ? "جارٍ الإرسال..." : "ارسال"}
      </button>
    </BaseModal>
  );
};

export default RatingModal;
