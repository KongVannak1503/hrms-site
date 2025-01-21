import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const PaginatedList = ({ items }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    // Calculate the index of the first and last items for the current page
    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected); // ReactPaginate uses 0-based index
    };

    return (
        <div>
            <ul>
                {currentItems.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

            {/* Pagination Controls */}
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={Math.ceil(items.length / itemsPerPage)}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                activeClassName={"active"}
            />
        </div>
    );
};

export default PaginatedList;
