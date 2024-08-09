"use client";

import React from "react";
import Link from "next/link";

const TableBody = ({ items, onBlock, onDelete, type }) => {
  return (
    <tbody>
      {items.map((item) => (
        <tr key={item.id || item.doctorId || item.userId}>
          {type === "questions" && (
            <>
              <td>{item.title}</td>
              <td>{item.id}</td>
              <td>{new Date(item.date).toLocaleDateString()}</td>
              <td>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/questions/${item.id}`}>
                    <button className="py-1 px-2 border-none bg-blue-500 rounded-sm">
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
          {type === "videos" && (
            <>
              <td>{item.title}</td>
              <td>{item.tags.map(tag => tag.name).join(", ")}</td>
              <td>{item.id}</td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/videos/${item.id}`}>
                    <button className="py-1 px-2 border-none bg-blue-500 rounded-sm">
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
          {type === "doctors" && (
            <>
              <td>{`${item.firstName} ${item.lastName}`}</td>
              <td>{item.email}</td>
              <td>{item.doctorId}</td>
              <td>{item.category}</td>
              <td>{item.rating}</td>
              <td>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/doctors/${item.doctorId}`}>
                    <button className="py-1 px-2 border-none bg-blue-500 rounded-sm">
                      View
                    </button>
                  </Link>
                  <button
                    onClick={() => onDelete(item.doctorId)}
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
          {type === "blogs" && (
            <>
              <td>{item.title}</td>
              <td>{item.id}</td>
              <td>{new Date(item.lastUpdated).toLocaleDateString()}</td>
              <td>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/Blogs/${item.id}`}>
                    <button className="py-1 px-2 border-none bg-blue-500 rounded-sm">
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
