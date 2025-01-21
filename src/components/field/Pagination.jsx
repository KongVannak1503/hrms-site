import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const Pagination = ({ currentPage, totalItems, onPageChange }) => {
    // Calculate the range of items to show
    const indexOfFirstItem = (currentPage - 1) * 10;
    const indexOfLastItem = Math.min(indexOfFirstItem + 10, totalItems);

    return (
        <div className="flex items-center justify-between mt-4 px-4">
            {/* Left Side */}
            <div className="text-sm text-gray-700">
                Showing {indexOfFirstItem + 1} to {indexOfLastItem} of {totalItems} items
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center space-x-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`${currentPage === 1
                        ? "bg-gray-200 cursor-not-allowed"
                        : "bg-gray-100 hover:bg-gray-300"
                        } w-[30px] h-[30px] flex justify-center items-center rounded-full text-gray-700 transition duration-200 ease-in-out`}
                >
                    <ChevronLeft size={15} />
                </button>
                <span className="text-gray-700 font-medium">{currentPage}</span>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage * 10 >= totalItems}
                    className={`${currentPage * 10 >= totalItems
                        ? "bg-gray-200 cursor-not-allowed"
                        : "bg-gray-100 hover:bg-gray-300"
                        } w-[30px] h-[30px] flex justify-center items-center rounded-full text-gray-700 transition duration-200 ease-in-out`}
                >
                    <ChevronRight size={15} />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
