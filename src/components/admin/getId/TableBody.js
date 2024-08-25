"use client";

import React from "react";
import Link from "next/link";

const TableBody = ({ items, onBlock, onDelete, type }) => {
  return (
    <tbody>
      {items.map((item) => (
        <tr key={item.id || item.userId || item.doctorId}>
          {/* Podcasts */}
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

          {/* Videos */}
          {type === "videos" && (
            <>
              <td>{item.title}</td>
              <td>{item.tags.map((tag) => tag.name).join(", ")}</td>
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

          {/* Users */}
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

          {/* Doctors */}
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

          {/* Blogs */}
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

          {/* Tags */}
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

          {/* Question Tags */}
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

          {/* Questions */}
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

          {/* Consultations */}
          {type === "consultations" && (
            <>
              <td>{item.userId}</td>
              <td>{item.doctorId}</td>
              <td>{new Date(item.date).toLocaleDateString()}</td>
              <td>{item.price}</td>
              <td>{item.isDone}</td>
             
              <td>
                 <Link href={item.meetingUrl} target="_blank">
                 <button className="p-2 text-sm bg-accentDark rounded-lg">
                  Meeting Link </button> </Link>
              </td>
            </>
          )}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
