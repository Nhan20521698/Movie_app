import { useEffect, useState } from "react";
import { getMovies, getMoviesByGenre } from "../../services/api";
import Navbar from "../../components/Navbar/Navbar";
import Banner from "../../components/Banner/Banner";
import MovieRow from "../../components/MovieRow/MovieRow";
import SearchArea from "../../components/SearchArea/SearchArea";
import Footer from "../../components/Footer/Footer";

function Home() {
  const [movies, setMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [animationMovies, setAnimationMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // 🔥 helper cache
    const fetchWithCache = async (key, apiCall, setter) => {
      try {
        const cached = sessionStorage.getItem(key);

        if (cached) {
          setter(JSON.parse(cached));
        } else {
          const res = await apiCall();
          const data = res?.data || [];
          setter(data);
          sessionStorage.setItem(key, JSON.stringify(data));
        }
      } catch (err) {
        console.error(err);
      }
    };

    // 🔥 gọi song song nhưng không block UI
    fetchWithCache("movies", getMovies, setMovies);
    fetchWithCache("romance", () => getMoviesByGenre("Romance"), setRomanceMovies);
    fetchWithCache("action", () => getMoviesByGenre("Action"), setActionMovies);
    fetchWithCache("animation", () => getMoviesByGenre("Animation"), setAnimationMovies);
    fetchWithCache("horror", () => getMoviesByGenre("Horror"), setHorrorMovies);

    setLoading(false); // 🔥 không chờ API
  }, []);

  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  return (
    <div className="home">
      <Navbar />
      <SearchArea onResults={setSearchResults} />

      {/* 🔥 Banner hiện ngay khi có data */}
      {movies.length > 0 && (
        <Banner movies={movies.slice(0, 5)} />
      )}

      {/* 🔥 từng row tự load */}
      <MovieRow title="🔥 Trending" movies={movies} loading={!movies.length} />

      <MovieRow title="💖 Romance" movies={romanceMovies} loading={!romanceMovies.length} />

      <MovieRow title="⚡ Action" movies={actionMovies} loading={!actionMovies.length} />

      <MovieRow title="🎬 Animation" movies={animationMovies} loading={!animationMovies.length} />

      <MovieRow title="👻 Horror" movies={horrorMovies} loading={!horrorMovies.length} />
      <Footer />
    </div>
  );
}

export default Home;