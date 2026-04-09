import MovieCard from "./MovieCard";

function MovieRow({ title, movies }) {
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row-posters">
        {movies.map(m => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </div>
  );
}

export default MovieRow;