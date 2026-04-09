import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar/Navbar";
import Banner from "../components/Banner/Banner";
import MovieRow from "../components/MovieRow/MovieRow";
import SearchArea from "../components/SearchArea/SearchArea";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/movies")
      .then(res => {
        setMovies(res.data || []);
      })
      .catch(err => {
        setError("Không load được dữ liệu");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h2 style={{color: "white"}}>Loading...</h2>;
  if (error) return <h2 style={{color: "red"}}>{error}</h2>;

  return (
    <div>
      <Navbar />
      <SearchArea />

      {movies.length > 0 && (
        <Banner movies={movies.slice(0, 3)} />
      )}

      {movies.length > 0 && (
        <MovieRow title="🔥 Trending" movies={movies} />
      )}
    </div>
  );
}

export default Home;