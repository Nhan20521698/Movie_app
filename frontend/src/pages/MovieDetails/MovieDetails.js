import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../services/api";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./MovieDetails.css";

function MovieDetail() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const res = await getMovieById(id);
        setMovie(res?.data || null);
      } catch (err) {
        console.error(err);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  // 👉 format date đẹp hơn
  const formatDate = (date) => {
    if (!date) return "Unknown";
    return new Date(date).toLocaleDateString();
  };

  if (loading)
    return <h2 style={{ color: "white", padding: "40px" }}>Loading...</h2>;

  if (!movie)
    return <h2 style={{ color: "white", padding: "40px" }}>Movie not found</h2>;

  return (
    <div
      className="movie-detail"
      style={{ "--backdrop": `url(${movie.backdrop})` }}
    >
      <Navbar />

      <div className="detail-container">
        {/* POSTER */}
        <div className="poster">
          <img src={movie.image} alt={movie.title} />
        </div>

        {/* INFO */}
        <div className="info">
          <h1>{movie.title}</h1>

          <div className="meta">
            <span>📅 {formatDate(movie.release_date)}</span>
            <span>🎬 {movie.director || "Unknown"}</span>
          </div>

          <p className="description">
            {movie.description || "No description available"}
          </p>

          {/* GENRES */}
          {movie.Genres?.length > 0 && (
            <div className="section">
              <h3>Genres</h3>
              <div className="tags">
                {movie.Genres.map((g) => (
                  <span key={g.id}>{g.name}</span>
                ))}
              </div>
            </div>
          )}

          {/* ACTORS */}
          {movie.Actors?.length > 0 && (
            <div className="section">
              <h3>Actors</h3>
              <div className="tags">
                {movie.Actors.slice(0, 6).map((a) => (
                  <span key={a.id}>{a.name}</span>
                ))}
              </div>
            </div>
          )}

          {/* STATS */}
          <div className="stats-badges">
            <span>⭐ {movie.rating?.toFixed(1) || "N/A"}</span>
            <span>❤️ {movie.likes || 0}</span>
            <span>👁️ {movie.views || 0}</span>
            <span>⏱️ {movie.duration || 0} min</span>
          </div>

          {/* ACTIONS */}
          <div className="action-details">
            <button className="play">▶ Play</button>
            <button className="like">❤️ Like</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MovieDetail;