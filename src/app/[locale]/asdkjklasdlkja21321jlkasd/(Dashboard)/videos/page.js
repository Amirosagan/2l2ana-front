"use client";

import React, { useState, useEffect, useCallback } from "react";
import api from "@/src/utils/api";
import { Link } from '@/src/i18n/routing';
import Cookies from "js-cookie";

const VideoPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const headers = ["Title", "Tags", "ID", "Created At", "Action"];

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const token = Cookies.get("authToken");
      const response = await api.get(
        `https://api.mettamena.com/api/Youtube?page=${currentPage}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const fetchedItems = response.data.items.map((item) => ({
        id: item.youtubeLink.id,
        title: item.youtubeLink.title,
        createdAt: item.youtubeLink.createdAt,
        tags: item.youtubeLink.tags || [], // Ensure tags are always an array
      }));

      setItems(fetchedItems || []);

      setTotalCount(response.data.totalCount);

      setHasNextPage(response.data.hasNextPage);
      setHasPreviousPage(response.data.hasPreviousPage);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Failed to fetch data.");
    }
  }, [currentPage, pageSize]);

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, fetchData]);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this video?")) {
      const token = Cookies.get("authToken");
      try {
        await api.delete(`/Youtube/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setItems(items.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error deleting video:", error);
      }
    }
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === "previous" && hasPreviousPage) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mt-5 p-5 rounded-xl bg-admin1">
      <div className="flex justify-between px-10 pb-10 items-center">
      
        <Link href="/asdkjklasdlkja21321jlkasd/newVideo">
          <button
            style={{ border: "none" }}
            className="p-3 h-10 flex items-center bg-accentDark text-white rounded-md cursor-pointer"
          >
            Add New
          </button>
        </Link>
      </div>
      <table className="w-full text-admin2">
        <thead>
          <tr className="font-bold">
            {headers.map((header, index) => (
              <td key={index} className="p-3">
                {header}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
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
                    onClick={() => handleDelete(item.id)}
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
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between p-4">
        <button
          onClick={() => handlePageChange("previous")}
          disabled={!hasPreviousPage}
          className={`p-2 ${hasPreviousPage ? "bg-accentDark" : "bg-gray-100"}  rounded`}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={!hasNextPage}
          className={`p-2 ${hasNextPage ? "bg-accentDark" : "bg-gray-100"}  rounded`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default VideoPage;
