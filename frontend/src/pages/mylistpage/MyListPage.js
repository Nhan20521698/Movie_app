import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFavorites } from "../../services/api";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./MyListPage.css";

function MyList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getFavorites()
      .then(res => setMovies(res.data || []))
      .catch(err => {
        console.error(err);
        setMovies([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mylist-page">
      <Navbar />

      <h1 className="title">❤️ My List</h1>

      {loading ? (
        <div className="grid">
          {Array(8).fill().map((_, i) => (
            <div key={i} className="skeleton"></div>
          ))}
        </div>
      ) : movies.length > 0 ? (
        <div className="grid">
          {movies.map(movie => (
            <div
              key={movie.id}
              className="card"
              onClick={() => navigate(`/movies/${movie.id}`)}
            >
              <img src={movie.image} alt={movie.title} />

              <div className="overlay">
                <h3>{movie.title}</h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No favorites yet 😢</h2>
          <p>Start liking movies to see them here!</p>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default MyList;