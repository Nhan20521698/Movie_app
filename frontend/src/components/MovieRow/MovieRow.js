import { useRef, useEffect } from "react";
import "./MovieRow.css";
import { Link } from "react-router-dom";

function MovieRow({ title, movies }) {
  const rowRef = useRef();
  const intervalRef = useRef();

  // ✅ luôn gọi hook trước
  useEffect(() => {
    if (!movies || movies.length === 0) return;

    const start = () => {
      intervalRef.current = setInterval(() => {
        const current = rowRef.current;
        if (!current) return;

        const maxScroll = current.scrollWidth - current.clientWidth;

        if (current.scrollLeft >= maxScroll) {
          current.scrollLeft = 0;
        } else {
          current.scrollLeft += current.offsetWidth;
        }
      }, 5000);
    };

    start();

    return () => clearInterval(intervalRef.current);
  }, [movies]);

  // ✅ return đặt SAU hook
  if (!movies || movies.length === 0) return null;

  const scroll = (direction) => {
    const current = rowRef.current;
    if (!current) return;

    const scrollAmount = current.offsetWidth;

    current.scrollLeft += direction === "next"
      ? scrollAmount
      : -scrollAmount;
  };

  return (
    <div className="movie-row">
      <h2>{title}</h2>

      <button className="nav prev" onClick={() => scroll("prev")}>❮</button>
      <button className="nav next" onClick={() => scroll("next")}>❯</button>

      <div
        className="row"
        ref={rowRef}
        onMouseEnter={() => clearInterval(intervalRef.current)}
        onMouseLeave={() => {
          intervalRef.current = setInterval(() => {
            const current = rowRef.current;
            if (!current) return;

            const maxScroll = current.scrollWidth - current.clientWidth;

            if (current.scrollLeft >= maxScroll) {
              current.scrollLeft = 0;
            } else {
              current.scrollLeft += current.offsetWidth;
            }
          }, 5000);
        }}
      >
        {movies.slice(0, 20).map((movie) => (
          <Link
    to={`/movies/${movie.id}`}
    key={movie.id}
    className="card-link"
  >
    <div className="card">
      <img src={movie.image || ""} alt={movie.title} />
    </div>
  </Link>
        ))}
      </div>
    </div>
  );
}

export default MovieRow;