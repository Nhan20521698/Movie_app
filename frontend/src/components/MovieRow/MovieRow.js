import { useRef, useEffect } from "react";
import "./MovieRow.css";
import { Link } from "react-router-dom";

function MovieRow({ title, movies }) {
  const rowRef = useRef();
  const intervalRef = useRef();

  useEffect(() => {
    if (!movies?.length) return;

    intervalRef.current = setInterval(() => {
      const el = rowRef.current;
      if (!el) return;

      const maxScroll = el.scrollWidth - el.clientWidth;

      if (el.scrollLeft >= maxScroll) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 800, behavior: "smooth" });
      }
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [movies]);

  if (!movies?.length) return null;

  const scroll = (dir) => {
    const el = rowRef.current;
    if (!el) return;

    el.scrollBy({
      left: dir === "next" ? 800 : -800,
      behavior: "smooth"
    });
  };

  return (
    <div className="movie-row">
      <h2>{title}</h2>

      <button className="nav prev" onClick={() => scroll("prev")}>
        ❮
      </button>

      <button className="nav next" onClick={() => scroll("next")}>
        ❯
      </button>

      <div
        className="row"
        ref={rowRef}
        onMouseEnter={() => clearInterval(intervalRef.current)}
        onMouseLeave={() => {
          intervalRef.current = setInterval(() => {
            const el = rowRef.current;
            if (!el) return;

            const maxScroll = el.scrollWidth - el.clientWidth;

            if (el.scrollLeft >= maxScroll) {
              el.scrollTo({ left: 0, behavior: "smooth" });
            } else {
              el.scrollBy({ left: 800, behavior: "smooth" });
            }
          }, 5000);
        }}
      >
        {movies.slice(0, 20).map((movie) => (
          
          <Link
            to={`/movies/${movie.id}`}
            key={`${movie.id}-${movie.tmdb_id}`}
            className="card-link"
             onClick={() => console.log("CLICK:", movie.id, movie.title)}
          >
            <div className="card">
              <img src={movie.image} alt={movie.title} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MovieRow;