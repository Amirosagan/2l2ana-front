"use client"; 
import { useState } from "react";
import { Button } from "@mui/material";

const PaginationControls = ({ totalQuestions, pageSize, onPageChange }) => {
    const [page, setPage] = useState(1);

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
            onPageChange(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < Math.ceil(totalQuestions / pageSize)) {
            setPage(page + 1);
            onPageChange(page + 1);
        }
    };

    return (
        <div className="flex justify-between my-4">
            <Button 
                onClick={handlePrevPage} 
                disabled={page === 1}
                variant="contained"
                className="bg-accent hover:bg-accent"
            >
                السابق
            </Button>
            <Button 
                onClick={handleNextPage} 
                disabled={page === Math.ceil(totalQuestions / pageSize)}
                variant="contained"
                className="bg-accent hover:bg-accent"
            >
                التالي
            </Button>
        </div>
    );
};

export default PaginationControls;
