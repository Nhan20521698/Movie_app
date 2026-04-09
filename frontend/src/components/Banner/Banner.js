import { useEffect, useState } from "react";
import "./Banner.css";

function Banner({ movies }) {
  const [index, setIndex] = useState(0);

  
  useEffect(() => {
    if (!movies || movies.length === 0) return;

    const bannerMovies = movies.slice(0, 3);

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % bannerMovies.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [movies]);

  
  if (!movies || movies.length === 0) return null;

  const bannerMovies = movies.slice(0, 3);
  const movie = bannerMovies[index];

  if (!movie) return null;

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(${movie.image || ""})`
      }}
    >
      <div className="overlay" />
      <div className="banner-content">
        <h1>{movie.title}</h1>
        <p>{movie.description}</p>
      </div>
    </div>
  );
}

export default Banner;