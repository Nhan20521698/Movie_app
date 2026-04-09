function Banner({ movie }) {
  return (
    <div style={{
      height: "400px",
      backgroundImage: `url(${movie?.image})`,
      backgroundSize: "cover",
      padding: "20px"
    }}>
      <h1>{movie?.title}</h1>
      <p>{movie?.description}</p>
    </div>
  );
}

export default Banner;