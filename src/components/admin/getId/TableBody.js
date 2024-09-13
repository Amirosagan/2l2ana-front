"use client";

import React, { useState, useEffect } from "react";
import { Link } from '@/src/i18n/routing';
import api from "@/src/utils/api";

const TableBody = ({ items, onBlock, onDelete, type }) => {
  const [userDetails, setUserDetails] = useState({});
  const [modalContent, setModalContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to fetch user details based on userId
  const fetchUserDetails = async (userId) => {
    try {
      const response = await api.get(`/User/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };

  useEffect(() => {
    // Fetch user details for each consultation item
    if (type === "consultations") {
      items.forEach(async (item) => {
        const details = await fetchUserDetails(item.userId);
        if (details) {
          setUserDetails((prevDetails) => ({
            ...prevDetails,
            [item.userId]: details,
          }));
        }
      });
    }
  }, [items, type]);

  const openModal = (content) => {
    if (content && content.length > 0) {
      setModalContent(content);
    } else {
      setModalContent("There is no message");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  // Close modal when clicking outside the dialog
  const handleOutsideClick = (event) => {
    if (event.target.id === "modal-background") {
      closeModal();
    }
  };

  const formatDateTimeToEgypt = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      timeZone: "Africa/Cairo",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <>
      <tbody>
        {items.map((item) => (
          <tr key={item.id || item.userId || item.doctorId}>
            {/* Consultations */}
            {type === "consultations" && (
              <>
                <td>
                  {userDetails[item.userId]?.firstName}{" "}
                  {userDetails[item.userId]?.lastName}
                </td>
                <td>{userDetails[item.userId]?.phoneNumber || item.userPhoneNumber}</td>
                <td>{item.doctorId}</td>
                <td>{formatDateTimeToEgypt(item.date)}</td> {/* Display date and time in Egypt's local time */}
                <td>{item.price} </td>
                <td>{item.isDone ? "Done" : "Not Yet"}</td>
                <td>
                  <button
                    onClick={() => openModal(item.comment)}
                    className="p-2 text-sm bg-neutral-200 text-black rounded-lg"
                  >
                    Show Comment
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => openModal(item.notes)}
                    className="p-2 text-sm bg-neutral-200 text-black rounded-lg"
                  >
                    Show Notes
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => openModal(item.notesAboutPatientForAdmin)}
                    className="p-2 text-sm bg-neutral-200 text-black rounded-lg"
                  >
                    Show Admin Notes
                  </button>
                </td>
                <td>
                  <Link href={item.meetingUrl} target="_blank">
                    <button className="p-2 text-sm bg-neutral-200 text-black rounded-lg">
                      Meeting Link
                    </button>
                  </Link>
                </td>
              </>
            )}

            {/* Other types */}
            {type === "podcasts" && (
              <>
                <td>{item.title}</td>
                <td>{item.tags.map((tag) => tag.name).join(", ")}</td>
                <td>{item.id}</td>
                <td>{item.audioUrl}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link href={`/asdkjklasdlkja21321jlkasd/podcasts/${item.id}`}>
                      <button className="py-1 px-2 border-none bg-accentDark rounded-sm">
                        View
                      </button>
                    </Link>
                    <button
                      onClick={() => onDelete(item.id)}
                      style={{
                        color: "rgb(235 235 235)",
                        backgroundColor: "rgb(156 14 14)",
                      }}
                      className="py-1 px-2 border-none rounded-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </>
            )}

            {type === "videos" && (
              <>
                <td>{item.title}</td>
                <td>
                  {Array.isArray(item.tags)
                    ? item.tags.map((tag) => tag.name).join(", ")
                    : "No tags available"}
                </td>
                <td>{item.id}</td>
                <td>{formatDateTimeToEgypt(item.createdAt)}</td> {/* Display date and time in Egypt's local time */}
                <td>
                  <div className="flex items-center gap-2">
                    <Link href={`/asdkjklasdlkja21321jlkasd/videos/${item.id}`}>
                      <button className="py-1 px-2 border-none bg-accentDark rounded-sm">
                        View
                      </button>
                    </Link>
                    <button
                      onClick={() => onDelete(item.id)}
                      style={{
                        color: "rgb(235 235 235)",
                        backgroundColor: "rgb(156 14 14)",
                      }}
                      className="py-1 px-2 border-none rounded-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </>
            )}

            {type === "users" && (
              <>
                <td>{`${item.firstName} ${item.lastName}`}</td>
                <td>{item.email}</td>
                <td>{item.id}</td>
                <td>{item.phoneNumber}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link href={`/asdkjklasdlkja21321jlkasd/users/${item.id}`}>
                      <button className="py-1 px-2 border-none bg-accentDark rounded-sm">
                        View
                      </button>
                    </Link>
                    <button
                      onClick={() => onBlock(item.id)}
                      style={{
                        color: "rgb(235 235 235)",
                        backgroundColor: "rgb(156 14 14)",
                      }}
                      className="py-1 px-2 border-none rounded-sm"
                    >
                      Block
                    </button>
                  </div>
                </td>
              </>
            )}

            {type === "doctors" && (
              <>
                <td>{`${item.firstName} ${item.lastName}`}</td>
                <td>{item.email}</td>
                <td>{item.doctorId}</td>
                <td>{item.category}</td>
                <td>{item.rating}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link href={`/asdkjklasdlkja21321jlkasd/doctors/${item.doctorId}`}>
                      <button className="py-1 px-2 border-none bg-accentDark rounded-sm">
                        View
                      </button>
                    </Link>
                  </div>
                </td>
              </>
            )}

            {type === "blogs" && (
              <>
                <td>{item.title}</td>
                <td>{item.id}</td>
                <td>{formatDateTimeToEgypt(item.lastUpdated)}</td> {/* Display date and time in Egypt's local time */}
                <td>
                  <div className="flex items-center gap-2">
                    <Link href={`/asdkjklasdlkja21321jlkasd/blogs/${item.id}`}>
                      <button className="py-1 px-2 border-none bg-accentDark rounded-sm">
                        View
                      </button>
                    </Link>
                    <button
                      onClick={() => onDelete(item.id)}
                      style={{
                        color: "rgb(235 235 235)",
                        backgroundColor: "rgb(156 14 14)",
                      }}
                      className="py-1 px-2 border-none rounded-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </>
            )}

            {type === "tags" && (
              <>
                <td>{item.name}</td>
                <td>{item.id}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link href={`/asdkjklasdlkja21321jlkasd/tags/${item.id}`}>
                      <button className="py-1 px-2 border-none bg-accentDark rounded-sm">
                        View
                      </button>
                    </Link>
                    <button
                      onClick={() => onDelete(item.id)}
                      style={{
                        color: "rgb(235 235 235)",
                        backgroundColor: "rgb(156 14 14)",
                      }}
                      className="py-1 px-2 border-none rounded-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </>
            )}

            {type === "questionTags" && (
              <>
                <td>{item.name}</td>
                <td>{item.id}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link href={`/asdkjklasdlkja21321jlkasd/questionTags/${item.id}`}>
                      <button className="py-1 px-2 border-none bg-accentDark rounded-sm">
                        View
                      </button>
                    </Link>
                    <button
                      onClick={() => onDelete(item.id)}
                      style={{
                        color: "rgb(235 235 235)",
                        backgroundColor: "rgb(156 14 14)",
                      }}
                      className="py-1 px-2 border-none rounded-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </>
            )}

            {type === "questions" && (
              <>
                <td>{item.title}</td>
                <td>{item.id}</td>
                <td>{formatDateTimeToEgypt(item.date)}</td> {/* Display date and time in Egypt's local time */}
                <td>
                  <div className="flex items-center gap-2">
                    <Link href={`/asdkjklasdlkja21321jlkasd/questions/${item.id}`}>
                      <button className="py-1 px-2 border-none bg-accentDark rounded-sm">
                        View
                      </button>
                    </Link>
                    <button
                      onClick={() => onDelete(item.id)}
                      style={{
                        color: "rgb(235 235 235)",
                        backgroundColor: "rgb(156 14 14)",
                      }}
                      className="py-1 px-2 border-none rounded-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>

      {/* Modal */}
      {isModalOpen && (
        <div
          id="modal-background"
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={handleOutsideClick}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <div className="mb-4">
              <h2 className="text-xl text-black font-bold">Message</h2>
            </div>
            <div className="mb-4">
              <p className="text-black">{modalContent}</p>
            </div>
            <div className="text-right">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TableBody;
