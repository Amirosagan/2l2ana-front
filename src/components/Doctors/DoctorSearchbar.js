"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Button, TextField, InputAdornment } from "@mui/material";
import api from "@/src/utils/api";

const SearchDoctorBar = ({ onSearch }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("جميع التخصصات");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/Doctor/GetDoctors');
        const uniqueCategories = [...new Set(response.data.items.map(doctor => doctor.category).filter(category => category.trim() !== ""))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onSearch(category === "جميع التخصصات" ? "" : category, searchTerm);
  };

  const handleSearch = () => {
    onSearch(selectedCategory === "جميع التخصصات" ? "" : selectedCategory, searchTerm);
  };

  return (
    <div className="mb-10 items-center flex flex-col gap-2 -mt-10  sm:mt-0 md:mt-10">
      <h2 className="tajawal-extrabold mb-5  text-center md:text-5xl tracking-wide text-4xl">
        ابحث عن <span className="text-primary"> دكتورك </span> المفضل
      </h2>
      <p className="text-gray-500 text-lg text-center mb-3">   أكثر من 100 طبيب متخصص في جميع التخصصات، متاحون لتقديم الاستشارات عبر الفيديو أو المكالمات الهاتفية. احصل على الرعاية الطبية المتميزة من راحة منزلك </p>
      <div className="flex w-full mt-3 max-w-md items-center mx-10 space-x-2 gap-3">
        <TextField
          fullWidth
          style={{marginRight:"15px"}}
          placeholder="بحث"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: '25px',
              '& fieldset': {
                borderColor: 'rgba(21, 99, 101, 0.5)',
              },
              '&:hover fieldset': {
                borderColor: 'rgb(21, 99, 101)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'rgb(21, 99, 101)',
              },
            },
            '& .MuiInputBase-input': {
              padding: '12.5px 14px',
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search className="h-4 w-4 mx-2" style={{ color: 'rgb(21, 99, 101)' }} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          style={{backgroundColor:"rgb(21, 99, 101)" , marginLeft:"15px"}}
          variant="contained"
          onClick={handleSearch}
          sx={{
            backgroundColor: 'rgb(21, 99, 101)',
            '&:hover': {
              backgroundColor: 'rgb(21, 99, 101)',
            },
            padding: '10px 25px',
            borderRadius: '25px',
            fontWeight: "700",
            fontStyle: "normal",
            fontFamily:"Tajawal"
          }}
        >
          بحث
        </Button>
      </div>
      <div className="flex gap-2 mt-4 mx-4 md:mx-10 lg:mx-16 flex-wrap">
        <h1
          className={`rounded-xl text-accent px-3 py-2 cursor-pointer ${selectedCategory === "جميع التخصصات" ? 'bg-accent text-white' : 'hover:bg-accent hover:text-white  border border-neutral-400'}`}
          onClick={() => handleCategoryClick("جميع التخصصات")}
        >
          جميع التخصصات
        </h1>
        {categories.map((category, index) => (
          <h1
            key={index}
            className={`rounded-xl text-accent px-3 py-2 cursor-pointer ${selectedCategory === category ? 'bg-accent text-white' : 'hover:bg-accent hover:text-white  border border-neutral-400'}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </h1>
        ))}
      </div>
    </div>
  );
};

export default SearchDoctorBar;
