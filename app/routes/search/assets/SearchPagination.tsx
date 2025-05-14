import React, { useState } from 'react'

interface PaginationProps<T> {
    data: [];
    itemsPerPage?: number;
    renderItem: (item: T) => React.ReactNode;
}

const SearchPagination = <T,>({
    data,
    itemsPerPage = 10,
    renderItem
}: PaginationProps<T>) => {
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(data.length / itemsPerPage)

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const goToPrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Next page
    const goToNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <div>
            {
                currentItems.map((item, index) => {
                    return (
                        <div key={index}>
                            {renderItem(item)}
                        </div>
                    )
                })
            }

            {/* Pagination controls */}
            {totalPages > 1 && (
                <div className={`flex justify-center gap-[5px] 
                mt-[60px]`}>
                    <button
                        onClick={goToPrevious}
                        disabled={currentPage === 1}
                        className="px-[12px] py-[8px] bg-white cursor-pointer border
                                rounded-[4px]"
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`px-[12px] py-[8px]  cursor-pointer border
                                rounded-[4px] ${currentPage === number ? 'bg-blue-500 text-white border-blue-500' : 'bg-white'}`}
                        >
                            {number}
                        </button>
                    ))}

                    <button
                        onClick={goToNext}
                        disabled={currentPage === totalPages}
                        className="px-[12px] py-[8px] bg-white cursor-pointer border
                                rounded-[4px]"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    )
}

export default SearchPagination
