import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchMovies } from "../../services/api";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SearchArea from "../../components/SearchArea/SearchArea";
import "./SearchPage.css";

function SearchPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 12;

  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const keyword = query.get("keyword");

  useEffect(() => {
    // ✅ FIX: xử lý khi không có keyword
    if (!keyword) {
      setMovies([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setCurrentPage(1);

    searchMovies(keyword)
      .then((res) => {
        setMovies(res?.data || []);
      })
      .catch((err) => {
        console.error(err);
        setMovies([]);
      })
      .finally(() => setLoading(false));
  }, [keyword]);

  // ================= PAGINATION =================
  const indexOfLast = currentPage * moviesPerPage;
  const indexOfFirst = indexOfLast - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const getPages = () => {
    const pages = [];

    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, start + 2);

    if (end - start < 2) {
      start = Math.max(1, end - 2);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="search-page">
      <Navbar />
      <SearchArea />

      <h2 className="search-title">
        🔍 Result for: "{keyword || ""}"
      </h2>

      {/* LOADING */}
      {loading ? (
        <div className="grid">
          {Array(12)
            .fill()
            .map((_, i) => (
              <div key={i} className="skeleton"></div>
            ))}
        </div>
      ) : !keyword ? (
        // ✅ FIX: chưa nhập keyword
        <div className="no-result">
          <h2>Start searching...</h2>
          <p>Enter a keyword to find movies</p>
        </div>
      ) : movies.length > 0 ? (
        <>
          {/* GRID */}
          <div className="grid">
            {currentMovies.map((movie) => (
              <div
                key={movie.id}
                className="card"
                onClick={() => navigate(`/movies/${movie.id}`)}
              >
                <img src={movie.image} alt={movie.title} />

                <div className="overlay">
                  <h3>{movie.title}</h3>
                  <p>
                    {movie.description
                      ? movie.description.slice(0, 80) + "..."
                      : "No description"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="pagination">
            {/* PREV */}
            <button
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage(currentPage - 1);
                window.scrollTo(0, 0);
              }}
            >
              ❮
            </button>

            {/* 3 PAGE */}
            {getPages().map((page) => (
              <button
                key={page}
                className={currentPage === page ? "active" : ""}
                onClick={() => {
                  setCurrentPage(page);
                  window.scrollTo(0, 0);
                }}
              >
                {page}
              </button>
            ))}

            {/* NEXT */}
            <button
              disabled={currentPage === totalPages}
              onClick={() => {
                setCurrentPage(currentPage + 1);
                window.scrollTo(0, 0);
              }}
            >
              ❯
            </button>
          </div>
        </>
      ) : (
        // ✅ FIX: không có kết quả
        <div className="no-result">
          <h2>No results found</h2>
          <p>
            There are no movies with the keyword: <b>"{keyword}"</b>
          </p>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default SearchPage;