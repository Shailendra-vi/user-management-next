"use client";

import { config } from "@/config"
import { useState } from "react";
import { TableComponent } from "./components/TableComponent";
import { Pagination } from "./components/Pagination";
import { Filters } from "./components/Filters";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";

const UsersClient = () => {
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");
    const { users, isLoading, error } = useSelector((state) => state.users);
    const param = useParams();
    const currentPage = parseInt(param.page || 1);
    const rowsPerPage = config.rowsPerPage || 10;

    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedUsers = users
        .filter((user) =>
            search
                ? user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase())
                : true
        )
        .sort((a, b) => {
            if (!sortKey) return 0;
            const valueA = a[sortKey];
            const valueB = b[sortKey];
            if (typeof valueA === "string" && typeof valueB === "string") {
                return sortOrder === "asc"
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA);
            } else if ((typeof valueA === "number" && typeof valueB === "number")) {
                return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
            }
            return 0;
        })
        .slice(startIndex, startIndex + rowsPerPage);

    const datalength = search ? paginatedUsers?.length : users?.length;

    return (
        <div className="container mx-auto py-10">
            <Filters
                search={search}
                onSearch={(value) => setSearch(value)}
                sortKey={sortKey}
                onSort={(key, order) => {
                    setSortKey(key);
                    setSortOrder(order);
                }}
            />
            <TableComponent data={paginatedUsers} />
            <Pagination
                currentPage={currentPage}
                totalItems={datalength || 1}
                rowsPerPage={rowsPerPage}
            />
        </div>
    );
};

export default UsersClient;
