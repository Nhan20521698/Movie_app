import { useEffect, useState } from "react";
import { getMovies, getMoviesByGenre } from "../../services/api";
import Navbar from "../../components/Navbar/Navbar";
import Banner from "../../components/Banner/Banner";
import MovieRow from "../../components/MovieRow/MovieRow";
import SearchArea from "../../components/SearchArea/SearchArea";

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
    Promise.all([
      getMovies(),
      getMoviesByGenre("Romance"),
      getMoviesByGenre("Action"),
      getMoviesByGenre("Animation"),
      getMoviesByGenre("Horror"),
    ])
      .then(([allRes, romanceRes, actionRes, animationRes, horrorRes]) => {
        setMovies(allRes?.data || []);
        setRomanceMovies(romanceRes?.data || []);
        setActionMovies(actionRes?.data || []);
        setAnimationMovies(animationRes?.data || []);
        setHorrorMovies(horrorRes?.data || []);
      })
      .catch(err => {
        setError("Không load được dữ liệu");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h2 style={{ color: "white" }}>Loading...</h2>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  return (
    <div className="home">
      <Navbar />
      <SearchArea onResults={setSearchResults}/>

      {movies.length > 0 && (
        <Banner movies={movies.slice(3, 6)} />
      )}

      <MovieRow title="🔥 Trending" movies={movies} />

      <MovieRow title="💖 Romance" movies={romanceMovies} />

      <MovieRow title="⚡ Action" movies={actionMovies} />

      <MovieRow title="🎬 Animation" movies={animationMovies} />

      <MovieRow title="👻 Horror" movies={horrorMovies} />
    </div>
  );
}

export default Home;