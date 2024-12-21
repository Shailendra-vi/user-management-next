'use client';

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";

export const Filters = ({ search, onSearch, onSort, sortKey }) => {
    const [sortOrder, setSortOrder] = useState("asc");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);

    const columns = [
        { header: "ID", accessorKey: "id" },
        { header: "Name", accessorKey: "name" },
        { header: "Username", accessorKey: "username" },
        { header: "Email", accessorKey: "email" },
        { header: "City", accessorFn: (row) => row.address.city, id: "city" },
        { header: "Phone", accessorKey: "phone" },
        { header: "Company Name", accessorFn: (row) => row.company.name, id: "companyName" },
        { header: "Website", accessorKey: "website" }
    ];

    const handleSortChange = (key) => {
        const newOrder = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newOrder);
        onSort(key, newOrder);
        setDropdownOpen(false);
    };

    const getSortLabel = (key) => {
        const column = columns.find((item) => item.accessorKey === key);
        if (column)
            return `${column.header} ${sortKey === key ? `(${sortOrder === "asc" ? "desc" : "asc"})` : ""}`;
        return key;
    };

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex justify-between bg-gray-800 p-4 rounded-lg relative">
            <Input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => onSearch(e.target.value)}
                className="bg-gray-700 px-4 py-2 text-white w-[300px] rounded focus:ring-2 focus:ring-purple-500"
            />
            <div className="relative" ref={dropdownRef}>
                <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button className="px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded">
                            Sort By
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="absolute mt-2 right-0 w-48 bg-gray-700 text-white rounded shadow-lg z-10 overflow-y-auto">
                        {columns.map((column) => (
                            <DropdownMenuItem
                                key={column.header}
                                onClick={() => handleSortChange(column.accessorKey)}
                                className="block px-4 py-2 text-left hover:bg-purple-600 w-full rounded cursor-pointer"
                            >
                                {getSortLabel(column.accessorKey)}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};
