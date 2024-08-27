import { SearchIcon } from "lucide-react";

const Search = ({ placeholder, value, onChange }) => {
    return (
        <div className="flex items-center gap-2 rounded-lg px-2 bg-white">
            <SearchIcon size={20} />
            <input
                style={{ border: "none" }}
                className="h-10 outline-none rounded-xl"
                type="text"
                placeholder={placeholder}
                value={value || ""}
                onChange={onChange} 
            />
        </div>
    );
};

export default Search;
