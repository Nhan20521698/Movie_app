import { useEffect, useState } from "react";
import { getGenres, getMoviesByGenreId } from "../../services/api";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import "./GenrePage.css";

function GenresPage() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 pagination
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 12;

  const navigate = useNavigate();

  useEffect(() => {
    getGenres()
      .then(res => setGenres(res.data || []))
      .catch(err => console.error(err));
  }, []);

  const handleClickGenre = async (genre) => {
    setSelectedGenre(genre);
    setLoading(true);
    setCurrentPage(1); // reset page

    try {
      const res = await getMoviesByGenreId(genre.id);
      setMovies(res.data || []);
    } catch (err) {
      console.error(err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 pagination logic
  const indexOfLast = currentPage * moviesPerPage;
  const indexOfFirst = indexOfLast - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  return (
    <div className="genres-page">
      <Navbar />

      <div className="container">
        <h1 className="title">🎬 Browse by Genre</h1>

        {/* GENRE BUTTON */}
        <div className="genre-list">
          {genres.map((g) => (
            <button
              key={g.id}
              className={`genre-btn ${selectedGenre?.id === g.id ? "active" : ""}`}
              onClick={() => handleClickGenre(g)}
            >
              {g.name}
            </button>
          ))}
        </div>

        {/* MOVIES */}
        {selectedGenre && (
          <div className="movies-section">
            <h2>🔥 {selectedGenre.name}</h2>

            {loading ? (
              <div className="movies-grid">
                {Array(12).fill().map((_, i) => (
                  <div key={i} className="skeleton"></div>
                ))}
              </div>
            ) : currentMovies.length > 0 ? (
              <>
                <div className="movies-grid">
                  {currentMovies.map(movie => (
                    <div
                      key={movie.id}
                      className="movie-card"
                      onClick={() => navigate(`/movies/${movie.id}`)}
                    >
                      <img src={movie.image} alt={movie.title} />
                      <p>{movie.title}</p>
                    </div>
                  ))}
                </div>

                {/* 🔥 PAGINATION */}
                <div className="pagination">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                  >
                    ⬅
                  </button>

                  <span>
                    {currentPage} of {totalPages}
                  </span>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                  >
                    ➡
                  </button>
                </div>
              </>
            ) : (
              <p className="empty">No movies found</p>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default GenresPage;