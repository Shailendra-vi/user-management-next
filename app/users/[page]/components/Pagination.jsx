'use client';

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const Pagination = ({ currentPage, totalItems, rowsPerPage }) => {
    const totalPages = Math.ceil(totalItems / rowsPerPage);
    const router = useRouter();

    return (
        <div className="flex justify-between items-center mt-4">
            <Button
                variant="default"
                disabled={currentPage === 1}
                className={`px-4 py-2 ${currentPage === 1 ? "bg-gray-600" : "bg-purple-600 hover:bg-purple-700"} text-white rounded disabled:opacity-50`}
                onClick={() => router.push(`${currentPage - 1}`)}
            >
                Previous
            </Button>
            <span className="text-white">
                Page {currentPage} of {totalPages}
            </span>
            <Button
                variant="default"
                disabled={currentPage === totalPages}
                className={`px-4 py-2 ${currentPage === totalPages ? "bg-gray-600" : "bg-purple-600 hover:bg-purple-700"} text-white rounded disabled:opacity-50`}
                onClick={() => router.push(`${currentPage + 1}`)}
            >
                Next
            </Button>
        </div>
    );
};
