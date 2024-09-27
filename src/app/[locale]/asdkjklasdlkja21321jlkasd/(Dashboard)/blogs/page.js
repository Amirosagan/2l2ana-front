"use client";

import React, { useState, useEffect, useCallback } from "react";
import api from "@/src/utils/api";
import Cookies from "js-cookie";
import { Link } from '@/src/i18n/routing';
import Pagination from "@/src/components/admin/pagination";

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Default to page 1
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(40); // Ensure consistency with API
  const [searchQuery, setSearchQuery] = useState("");
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const headers = ["Title", "ID", "Last Updated", "Action"];
  const addNewLink = "/asdkjklasdlkja21321jlkasd/newBlog";

  // Fetch blogs function
  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const token = Cookies.get("authToken");
      const response = await api.get(
        `/Post?PageNumber=${currentPage}&PageSize=${pageSize}`, // Fetch based on currentPage
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const fetchedBlogs = response.data.items;
      setBlogs(fetchedBlogs || []);
      setFilteredBlogs(fetchedBlogs || []);
      setTotalCount(response.data.totalCount);

      // Set pagination states based on response
      setHasNextPage(response.data.hasNextPage);
      setHasPreviousPage(response.data.hasPreviousPage);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Failed to fetch data");
    }
  }, [currentPage, pageSize]); // Dependency on currentPage and pageSize

  // Fetch blogs when component mounts and whenever the page number changes
  useEffect(() => {
    fetchBlogs(); // Fetches new data when currentPage changes
  }, [fetchBlogs]);

  // Handle search functionality
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredBlogs(blogs);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      setFilteredBlogs(
        blogs.filter((blog) =>
          blog.title.toLowerCase().includes(lowerCaseQuery) ||
          blog.id.toString().includes(lowerCaseQuery)
        )
      );
    }
  }, [searchQuery, blogs]);

  // Handle delete functionality
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      const token = Cookies.get("authToken");
      try {
        await api.delete(`/Post/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(blogs.filter((blog) => blog.id !== id));
        setFilteredBlogs(filteredBlogs.filter((blog) => blog.id !== id));
      } catch (error) {
        console.error("Failed to delete blog:", error);
      }
    }
  };

  // Handle page change logic
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
        <input
          type="text"
          placeholder="Search by Title or ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-md"
        />
        <Link href={addNewLink}>
          <button
            className="p-3 h-10 flex items-center bg-accentDark text-white rounded-md cursor-pointer"
          >
            Add New Blog
          </button>
        </Link>
      </div>
      <table className="w-full text-admin2">
        <thead>
          <tr className="font-bold">
            {headers.map((header, index) => (
              <td key={index} className="p-3">{header}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredBlogs.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.title}</td>
              <td>{blog.id}</td>
              <td>{new Date(blog.lastUpdated).toLocaleString("en-US", { timeZone: "Africa/Cairo" })}</td>
              <td>
                <div className="flex items-center gap-2">
                  <Link href={`/asdkjklasdlkja21321jlkasd/blogs/${blog.id}`}>
                    <button className="py-1 px-2 border-none bg-accentDark rounded-sm">
                      View
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(blog.id)}
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
      <Pagination
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BlogManagement;
