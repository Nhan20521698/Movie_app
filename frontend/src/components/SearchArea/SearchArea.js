import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchArea.css";

function SearchArea({ onResults }) {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!keyword.trim()) return;

    navigate(`/search?keyword=${keyword}`);     
  };

  return (
    <div className="search-area" id="search-area">
        <div className="container">
            <h2>Search for Movies, Actions and more...</h2>
            <div className="search-input">
                <input
                    type="text"
                    className="input-search"
                    placeholder="Search movies..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button className="btn-search" onClick={handleSearch}>Search</button>
            </div>
        </div>
    </div>
  );
}

export default SearchArea;