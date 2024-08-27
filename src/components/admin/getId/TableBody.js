"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/src/utils/api"; 

const TableBody = ({ items, onBlock, onDelete, type }) => {
  const [userDetails, setUserDetails] = useState({});

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

  return (
    <tbody>
      {items.map((item) => (
        <tr key={item.id || item.userId || item.doctorId}>
          {/* Consultations */}
          {type === "consultations" && (
            <>
              <td>{userDetails[item.userId]?.firstName} {userDetails[item.userId]?.lastName}</td>
                 <td>{userDetails[item.userId]?.phoneNumber || item.userPhoneNumber}</td>
              <td>{item.doctorId}</td>
              <td>{new Date(item.date).toLocaleDateString()}</td>
              <td>{item.price}</td>
              <td>{item.isDone ? "Done" : "NotYet"}</td>
              <td>
                <Link href={item.meetingUrl} target="_blank">
                  <button className="p-2 text-sm bg-accentDark rounded-lg">
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
              <td>{Array.isArray(item.tags) ? item.tags.map((tag) => tag.name).join(", ") : "No tags available"}</td>
              <td>{item.id}</td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
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
                  {/* <button
                    onClick={() => onDelete(item.doctorId)}
                    style={{
                      color: "rgb(235 235 235)",
                      backgroundColor: "rgb(156 14 14)",
                    }}
                    className="py-1 px-2 border-none rounded-sm"
                  >
                    Delete
                  </button> */}
                </div>
              </td>
            </>
          )}

          {type === "blogs" && (
            <>
              <td>{item.title}</td>
              <td>{item.id}</td>
              <td>{new Date(item.lastUpdated).toLocaleDateString()}</td>
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
              <td>{new Date(item.date).toLocaleDateString()}</td>
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
  );
};

export default TableBody;
