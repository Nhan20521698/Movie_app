import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import MovieRow from "../components/MovieRow";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api.get("/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <Navbar />
      {movies.length > 0 && <Banner movie={movies[0]} />}
      <MovieRow title="Trending" movies={movies} />
    </div>
  );
}

export default Home;