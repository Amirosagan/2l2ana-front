"use client";
import { useState, useEffect } from "react";
import SuggestionList from "@/src/components/Doctors/DoctorSuggestionList";
import HeroQestion from "@/src/components/Questions/HeroQestions";
import Search from "@/src/components/Questions/Search";
import Questions from "@/src/components/Questions/Qestions";
import api from "@/src/utils/api";

const QuestionAnswers = () => {
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/Question')
            .then(response => {
                setQuestions(response.data.items);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    const handleSearch = (filtered) => {
        setFilteredQuestions(filtered);
    };

    return (
        <div>
            <HeroQestion />
            <div className="flex flex-col justify-between mx-[4%] lg:mx-20 mt-10 md:mt-28 gap-20 lg:gap-2 lg:flex-row">
                <div className="w-full">
                    <Search onSearch={handleSearch} />
                    <Questions filteredQuestions={filteredQuestions} />
                </div>
                <div className=' sticky lg:max-w-[30%] top-40 lg:h-[calc(100vh-40px)] md:min-w-[370px]'>
                    <SuggestionList blog={true} />
                </div>
            </div>
        </div>
    );
};

export default QuestionAnswers;
