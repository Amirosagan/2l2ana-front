import { useState, useEffect } from "react";
import Select from "react-select";
import api from "@/src/utils/api";

const customSelectStyles = {
    container: (provided) => ({
        ...provided,
        width: '100%',
        padding: '0 10px',
    }),
    control: (provided) => ({
        ...provided,
        height: '56px',
        borderColor: 'rgba(0, 0, 0, 0.23)',
        '&:hover': {
            borderColor: 'rgba(0, 0, 0, 0.87)',
        },
        '&:focus': {
            borderColor: 'rgba(0, 0, 0, 0.87)',
        },
    }),
    menu: (provided) => ({
        ...provided,
        zIndex: 9999,
    }),
};

const Search = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState({ value: null, label: "جميع التخصصات" });
    const [tags, setTags] = useState([]);
    const [allQuestions, setAllQuestions] = useState([]);

    useEffect(() => {
        api.get('/QuestionTag')
            .then(response => {
                const options = response.data.questionTags
                    .filter(tag => tag.id !== 2) 
                    .map(tag => ({
                        value: tag.id,
                        label: tag.name,
                    }));
                
                options.unshift({ value: null, label: "جميع التخصصات" });
                setTags(options);
            })
            .catch(error => console.error('Error fetching tags:', error));

       
        api.get('/Question')
            .then(response => {
                setAllQuestions(response.data.items);
                onSearch(response.data.items);
            })
            .catch(error => console.error('Error fetching questions:', error));
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        handleSearch(category, event.target.value);
    };

    const handleCategoryChange = (selectedOption) => {
        setCategory(selectedOption);
        handleSearch(selectedOption, searchQuery); 
    };

    const handleSearch = (selectedCategory, query) => {
        const regex = new RegExp(query, 'i'); 
        const filtered = allQuestions.filter(q => {
            const matchesQuery = regex.test(q.title) ||
                regex.test(q.content) ||
                q.tags.some(tag => regex.test(tag.name));
            const matchesCategory = !selectedCategory || q.tags.some(tag => tag.id === selectedCategory.value);
            return matchesQuery && (selectedCategory.value === null || matchesCategory);
        });
        onSearch(filtered.length ? filtered : []);
    };

    return (
        <div className="w-full pb-4 pt-4 md:pt-0 sm:pb-0 mb-10 px-5 mt-0 m-auto flex flex-col sm:flex-row justify-between border rounded-lg items-center border-neutral-100 bg-neutral-100 lg:bg-transparent lg:border-none">
            <div className="flex items-center w-full relative">
                <input
                    type="text"
                    placeholder="ابحث..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="p-4 w-full border rounded outline-none"
                    style={{ paddingRight: '10px', paddingLeft: '10px' }}
                />
                <button onClick={() => handleSearch(category, searchQuery)} className="bg-accent w-fit absolute top-0 left-0 bottom-0 text-white" style={{ height: '100%', padding: '0 14px' }}>
                    ابحث
                </button>
            </div>
            <h1 className="text-primary mx-5 mb-4 sm:mb-0 ml-7 mt-5 lg:mt-0"> أو </h1>
            <div className="sm:w-[20%] w-full">
                <Select
                    options={tags}
                    value={category}
                    onChange={handleCategoryChange}
                    placeholder="اختر التخصص"
                    styles={customSelectStyles}
                />
            </div>
        </div>
    );
};

export default Search;
