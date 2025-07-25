"use client";

import React, { useEffect, useState, useCallback } from "react";
import api from "@/src/utils/api";
import Search from "@/src/components/admin/Search";
import Pagination from "@/src/components/admin/pagination";
import { Link } from '@/src/i18n/routing';
import TableHeader from "@/src/components/admin/getId/TableHeader";
import TableBody from "@/src/components/admin/getId/TableBody";
import Cookies from "js-cookie";

const AdminPage = ({ type, apiUrl, headers, addNewLink, refresh }) => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalCount, setTotalCount] = useState(0);
    const [pageSize, setPageSize] = useState(40);
    const [searchQuery, setSearchQuery] = useState("");
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const token = Cookies.get("authToken");
            const response = await api.get(
                `${apiUrl}?PageNumber=${currentPage}&PageSize=${pageSize}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            let fetchedItems;

            switch (type) {
                case "users":
                    fetchedItems = response.data.users.filter((user) => !user.isBlocked);
                    break;
                case "podcasts":
                    fetchedItems = response.data.podcasts;
                    break;
                case "videos":
                    fetchedItems = response.data.items.map((item) => item.youtubeLink);
                    break;
                case "tags":
                case "questionTags":
                    fetchedItems = response.data[type].filter(
                        (tag) => tag.name.toLowerCase() !== "featured"
                    );
                    break;
                default:
                    fetchedItems = response.data.items;
                    break;
            }

            setItems(fetchedItems || []);
            setFilteredItems(fetchedItems || []);
            setTotalCount(response.data.totalCount);

            // Set pagination states
            setHasNextPage(response.data.hasNext);
            setHasPreviousPage(response.data.hasPrevious);

            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError("Failed to fetch data");
        }
    }, [apiUrl, currentPage, pageSize, type]);

    useEffect(() => {
        fetchData();
    }, [fetchData, refresh]);

    useEffect(() => {
        if (searchQuery === "") {
            setFilteredItems(items);
        } else {
            const lowerCaseQuery = searchQuery.toLowerCase();
            setFilteredItems(
                items.filter((item) =>
                    // Search by ID, full name, or phone number
                    item.id.toString().includes(lowerCaseQuery) ||
                    item.phoneNumber.includes(lowerCaseQuery) ||
                    `${item.firstName} ${item.lastName}`.toLowerCase().includes(lowerCaseQuery)
                )
            );
        }
    }, [searchQuery, items]);

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this item?")) {
            const token = Cookies.get("authToken");
            try {
                let deleteUrl = apiUrl;
                switch (type) {
                    case "videos":
                        deleteUrl = `/Youtube/delete/${id}`;
                        break;
                    case "blogs":
                        deleteUrl = `/Post/delete/${id}`;
                        break;
                    case "tags":
                        deleteUrl = `/${type}/delete/${id}`;
                        break;
                    case "questionTags":
                        deleteUrl = `/${type}/${id}`;
                        break;
                    default:
                        deleteUrl = `${apiUrl}/${id}`;
                        break;
                }

                await api.delete(deleteUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setItems(items.filter((item) => item.id !== id));
                setFilteredItems(filteredItems.filter((item) => item.id !== id));
            } catch (error) {
                console.error("Failed to delete item:", error);
            }
        }
    };

    const handleBlock = async (id) => {
        if (confirm("Are you sure you want to block this user?")) {
            const token = Cookies.get("authToken");
            try {
                await api.patch(
                    `/User/block`,
                    { userId: id },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                alert("User blocked successfully");
                fetchData();
            } catch (error) {
                console.error("Failed to block user:", error);
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

    const paginatedItems = filteredItems;

    return (
        <div className="mt-5 p-5 rounded-xl bg-admin1">
            <div className="flex justify-between px-10 pb-10 items-center">
                {type === "users" && (
                    <Search 
                        placeholder={`Search for a ${type.slice(0, -1)}...`} 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
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
                <TableBody
                    items={paginatedItems}
                    onDelete={handleDelete}
                    onBlock={type === "users" ? handleBlock : undefined}
                    type={type}
                />
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
