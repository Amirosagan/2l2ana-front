"use client";

import React, { useEffect, useState, useCallback } from "react";
import api from "@/src/utils/api";
import Search from "@/src/components/admin/Search";
import Pagination from "@/src/components/admin/pagination";
import Link from "next/link";
import TableHeader from "@/src/components/admin/getId/TableHeader";
import TableBody from "@/src/components/admin/getId/TableBody";
import Cookies from "js-cookie";

const AdminPage = ({ type, apiUrl, headers, addNewLink, refresh }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const token = Cookies.get("authToken");
      const response = await api.get(
        `${apiUrl}?page=${currentPage}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let fetchedItems;

      if (type === "podcasts") {
        fetchedItems = response.data.podcasts;
      } else if (type === "users") {
        fetchedItems = response.data.users;
      } else if (type === "videos") {
        fetchedItems = response.data.items.map((item) => item.youtubeLink);
      } else if (type === "tags") {
        fetchedItems = response.data.tags.filter(tag => tag.name.toLowerCase() !== "featured");
      } else if (type === "questionTags") {
        fetchedItems = response.data.questionTags.filter(tag => tag.name.toLowerCase() !== "featured");
      } else {
        fetchedItems = response.data.items;
      }

      setItems(fetchedItems || []);
      setTotalCount(response.data.totalItems || fetchedItems.length);
      setHasNextPage(response.data.hasNextPage || false);
      setHasPreviousPage(response.data.hasPreviousPage || false);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  }, [apiUrl, currentPage, pageSize, type]);

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, fetchData, refresh]);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      const token = Cookies.get("authToken");
      try {
        let deleteUrl = apiUrl;
        if (type === "videos") {
          deleteUrl = `/Youtube/delete/${id}`;
        } else if (type === "blogs") {
          deleteUrl = `/Post/delete/${id}`;
        } else if (type === "tags") {
          deleteUrl = `/Tags/delete/${id}`;
        } else if (type === "questionTags") {
          deleteUrl = `/QuestionTag/delete/${id}`;
        } else {
          deleteUrl = `${apiUrl}/${id}`;
        }
        await api.delete(deleteUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setItems(items.filter((item) => item.id !== id));
      } catch (error) {
        // Handle delete error
      }
    }
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && hasNextPage) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "previous" && hasPreviousPage) {
      setCurrentPage(currentPage - 1);
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
        {type !== "tags" && type !== "questionTags" && (
          <Search placeholder={`Search for a ${type.slice(0, -1)}...`} />
        )}
        {type !== "users" &&
          type !== "tags" &&
          type !== "questionTags" &&
          addNewLink && (
            <Link href={addNewLink}>
              <button
                style={{ border: "none" }}
                className="p-3 h-10 flex items-center bg-accentDark text-white rounded-md cursor-pointer"
              >
                Add New
              </button>
            </Link>
          )}
      </div>
      <table className="w-full text-admin2">
        <TableHeader headers={headers} />
        <TableBody items={items} onDelete={handleDelete} type={type} />
      </table>
      <Pagination
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AdminPage;
