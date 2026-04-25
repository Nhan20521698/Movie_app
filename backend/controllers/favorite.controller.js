const { Favorite, Movie } = require("../models");

exports.toggleFavorite = async (req, res) => {
  try {
    const userId = 1; // ⚠️ test tạm
    const { movieId } = req.body;

    const existing = await Favorite.findOne({
      where: { user_id: userId, movie_id: movieId }
    });

    if (existing) {
      // ❌ UNLIKE
      await existing.destroy();

      await Movie.decrement("likes", {
        by: 1,
        where: { id: movieId }
      });

      return res.json({ liked: false });
    } else {
      // ✅ LIKE
      await Favorite.create({
        user_id: userId,
        movie_id: movieId
      });

      await Movie.increment("likes", {
        by: 1,
        where: { id: movieId }
      });

      return res.json({ liked: true });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const userId = 1; // ⚠️ test tạm    
    const favorites = await Favorite.findAll({
        where: { user_id: userId },
        include: {
            model: Movie,
            as: "Movie",
            attributes: ["id", "title", "poster_path"]
        }
    }); 
    res.json(favorites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.checkFavorite = async (req, res) => {
  try {
    const userId = 1;
    const { movieId } = req.query;

    const exists = await Favorite.findOne({
      where: { user_id: userId, movie_id: movieId }
    });

    res.json({ liked: !!exists });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

