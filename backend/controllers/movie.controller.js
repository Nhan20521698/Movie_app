const { Movie, Actor, Genre } = require("../models");
const { Op, fn, col, where } = require("sequelize");

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll({
  include: [
    { model: Actor, as: "Actors" },
    { model: Genre, as: "Genres" }
  ]
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
  include: [
    {
      model: Actor,
      as: "Actors",
      through: { attributes: [] }
    },
    {
      model: Genre,
      as: "Genres",
      through: { attributes: [] }
    }
  ]
});

    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMoviesByGenre = async (req, res) => {
  try {
    const genre = req.query.genre;

    if (!genre) {
      return res.status(400).json({ error: "genre is required" });
    }

    const movies = await Movie.findAll({
      include: [
        {
          model: Genre,
          as: "Genres",
          required: true,
          where: {
            name: genre
          },
          through: { attributes: [] }
        }
      ]
    });

    console.log("RESULT COUNT:", movies.length);

    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};



exports.searchMovies = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({ error: "Keyword is required" });
    }

    const movies = await Movie.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${keyword}%` } },
          { description: { [Op.like]: `%${keyword}%` } }
        ]
      }
    });

    res.json(movies || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};