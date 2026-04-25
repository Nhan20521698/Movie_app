import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaGlobe, FaCalendarAlt } from "react-icons/fa";

import { getMovieById } from "../../services/api";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./MovieDetails.css";

function MovieDetail() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

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

  const formatDate = (date) => {
    if (!date) return "Unknown";
    return new Date(date).toLocaleDateString();
  };

  if (loading)
    return <h2 className="loading">Loading...</h2>;

  if (!movie)
    return <h2 className="loading">Movie not found</h2>;

  return (
    <div className="movie-detail">
      <Navbar />

      {/* 🎬 HERO BACKDROP */}
      <div
        className="hero"
        style={{
          backgroundImage: `url(${movie.backdrop})`
        }}
      >
        <div className="hero-overlay">
          <h1>{movie.title}</h1>

          <div className="meta">
            <span>{formatDate(movie.release_date)}</span>
            <span>{movie.director || "Unknown"}</span>
          </div>

          <p>{movie.description}</p>

          <div className="hero-actions">
            <button onClick={() => setShowTrailer(true)}>
              ▶ Play
            </button>

            <button className="secondary">
              ❤️ {movie.likes || 0}
            </button>
          </div>
        </div>
      </div>

      {/* 🎬 DETAIL */}
      <div className="detail-container">
        <div className="poster">
          <img src={movie.image} alt={movie.title} />
        </div>

        <div className="info">
          {/* Country */}
          <div className="section">
            <h3>Country</h3>
            <p>
              <FaGlobe />
              {movie.country || "Unknown"}
            </p>
          </div>

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

          {/* Date Release */}
          <div className="section">
            <h3>Release Date</h3>
            <p>
              <FaCalendarAlt />
              {formatDate(movie.release_date)}
            </p>
          </div>

          {/* STATS */}
          <div className="stats">
            <span>⭐ {movie.rating?.toFixed(1) || "N/A"}</span>
            <span>👁️ {movie.views}</span>
            <span>⏱️ {movie.duration} min</span>
          </div>
          
        </div>
      </div>

      {/* 🎥 TRAILER MODAL */}
      {showTrailer && (
        <div className="trailer-modal">
          <div className="trailer-box">
            <button
              className="close"
              onClick={() => setShowTrailer(false)}
            >
              ✖
            </button>

            {movie.trailer_url ? (
              <iframe
                src={`${movie.trailer_url}?autoplay=1&mute=1`}
                allow="autoplay"
                allowFullScreen
                title="Trailer"
              />
            ) : (
              <p>No trailer available</p>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default MovieDetail;