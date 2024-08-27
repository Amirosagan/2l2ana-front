const Pagination = ({ currentPage, hasNextPage, hasPreviousPage, onPageChange }) => {
    return (
        <div className="flex justify-between p-3 pt-10">
            <button
                onClick={() => onPageChange("previous")}
                className="py-1 px-3 shadow-xl rounded-sm bg-white"
                disabled={!hasPreviousPage}
            >
                Previous
            </button>
            <span className="px-4 py-2">Page {currentPage}</span>
            <button
                onClick={() => onPageChange("next")}
                className="py-1 px-3 shadow-lg rounded-sm bg-white"
                disabled={!hasNextPage}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
