const express = require("express");
const router = express.Router();

const genreController = require("../controllers/genre.controller");

router.get("/", genreController.getAllGenres);
router.get("/:id/movies", genreController.getMoviesByGenre);

module.exports = router;