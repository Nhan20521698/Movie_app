const { Movie, Actor, Genre } = require("../models");

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll({
      include: [Actor, Genre]
    });

    res.json(movies);
  } catch (err) {
    console.error("ERROR:", err);   // 👈 in lỗi ra console
    res.status(500).json({ error: err.message });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id, {
      include: [Actor, Genre]
    });

    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};