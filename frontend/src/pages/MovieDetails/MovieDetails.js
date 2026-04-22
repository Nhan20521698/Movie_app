import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../services/api";
import Navbar from "../../components/Navbar/Navbar";
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

      if (!res?.data) {
        setMovie(null);
        return;
      }

      setMovie(res.data);
    } catch (err) {
      console.error(err);
      setMovie(null);
    } finally {
      setLoading(false);
    }
  };

  fetchMovie();
}, [id]);

  if (loading) return <h2 style={{ color: "white" }}>Loading...</h2>;
  if (!movie) return <h2 style={{ color: "white" }}>Movie not found</h2>;

  return (
    <div className="movie-detail">
  <Navbar />

  <div className="detail-container">
    {/* LEFT - IMAGE */}
    <div className="poster">
      <img src={movie.image} alt={movie.title} />
    </div>

    {/* RIGHT - INFO */}
    <div className="info">
      <h1>{movie.title}</h1>

      <div className="meta">
        <span>📅 {movie.release_date}</span>
        <span>🎬 {movie.director}</span>
      </div>

      <p className="description">
        {movie.description || "No description available"}
      </p>

      {/* GENRES */}
      <div className="section">
        <h3>Genres</h3>
        <div className="tags">
          {movie.Genres?.map((g) => (
            <span key={g.id}>{g.name}</span>
          ))}
        </div>
      </div>

      {/* ACTORS */}
      <div className="section">
        <h3>Actors</h3>
        <div className="tags">
          {movie.Actors?.map((a) => (
            <span key={a.id}>{a.name}</span>
          ))}
        </div>
      </div>
      <div className="stats-badges">
        <span>⭐ {movie.rating}</span>
        <span>❤️ {movie.likes}</span>
        <span>👁️ {movie.views}</span>
        <span>⏱️ {movie.duration} minutes</span>
      </div>

      {/* BUTTON */}
      <div className="actions">
        <button className="play">▶ Play</button>
        <button className="like">❤️ Like</button>
      </div>
    </div>
  </div>
</div>
  );
}

export default MovieDetail;