import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaGlobe, FaCalendarAlt } from "react-icons/fa";

import {
  getMovieById,
  toggleFavorite,
  checkFavorite
} from "../../services/api";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./MovieDetails.css";

function MovieDetail() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);

        // 🔥 lấy thông tin phim
        const res = await getMovieById(id);
        setMovie(res?.data || null);

        // 🔥 check trạng thái like
        const token = localStorage.getItem("token");

        if (token) {
          const favRes = await checkFavorite(id);
          setLiked(favRes.data.liked);
        }

      } catch (err) {
        console.error(err);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  // 🔥 HANDLE LIKE
  const handleLike = async () => {
    try {
      const res = await toggleFavorite(movie.id);

      setLiked(res.data.liked);

      // update UI ngay lập tức
      setMovie(prev => ({
        ...prev,
        likes: res.data.liked
          ? (prev.likes || 0) + 1
          : Math.max((prev.likes || 1) - 1, 0)
      }));

    } catch (err) {
      console.error(err);
      alert("Please login first");
    }
  };

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

      {/* 🎬 HERO */}
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

            {/* ❤️ LIKE BUTTON */}
            <button
              className={`secondary ${liked ? "active" : ""}`}
              onClick={handleLike}
            >
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
          <div className="section">
            <h3>Country</h3>
            <p>
              <FaGlobe />
              {movie.country || "Unknown"}
            </p>
          </div>

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

          <div className="section">
            <h3>Release Date</h3>
            <p>
              <FaCalendarAlt />
              {formatDate(movie.release_date)}
            </p>
          </div>

          <div className="stats">
            <span>⭐ {movie.rating?.toFixed(1) || "N/A"}</span>
            <span>👁️ {movie.views}</span>
            <span>⏱️ {movie.duration} min</span>
          </div>
        </div>
      </div>

      {/* 🎥 TRAILER */}
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