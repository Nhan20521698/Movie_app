function MovieCard({ movie }) {
  return (
    <img
      className="poster"
      src={movie.image}
      alt={movie.title}
    />
  );
}

export default MovieCard;