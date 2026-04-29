const { Genre, Movie } = require("../models");

exports.getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.json(genres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMoviesByGenre = async (req, res) => {
  try {
    const { id } = req.params;

    const genre = await Genre.findByPk(id, {
      include: {
        model: Movie,
        as: "Movies"
      }
    });

    res.json(genre?.Movies || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};