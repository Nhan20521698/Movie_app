import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchMovies } from "../../services/api";
import Navbar from "../../components/Navbar/Navbar";
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
    if (!keyword) return;

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

  // Pagination
  const indexOfLast = currentPage * moviesPerPage;
  const indexOfFirst = indexOfLast - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  return (
    <div className="search-page">
      <Navbar />
        <SearchArea />
      <h2 className="search-title">
        🔍 Kết quả cho: "{keyword}"
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
      ) : movies.length > 0 ? (
        <>
          {/* GRID */}
          <div className="grid">
            {currentMovies.map((movie) => (
              <div
                key={movie.id}
                className="card"
                onClick={() => navigate(`/movie/${movie.id}`)}
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
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => {
                  setCurrentPage(i + 1);
                  window.scrollTo(0, 0);
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="no-result">
          <h2>Không tìm thấy kết quả</h2>
          <p>
            Không có phim nào với từ khóa: <b>"{keyword}"</b>
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchPage;