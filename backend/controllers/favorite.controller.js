const { Favorite, Movie } = require("../models");

exports.toggleFavorite = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ lấy từ token
    const { movie_id } = req.body; // 🔥 đồng bộ frontend

    const existing = await Favorite.findOne({
      where: { user_id: userId, movie_id }
    });

    if (existing) {
      // ❌ UNLIKE
      await existing.destroy();

      await Movie.decrement("likes", {
        by: 1,
        where: { id: movie_id }
      });

      return res.json({ liked: false });
    }

    // ✅ LIKE
    await Favorite.create({
      user_id: userId,
      movie_id
    });

    await Movie.increment("likes", {
      by: 1,
      where: { id: movie_id }
    });

    res.json({ liked: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;

    const favorites = await Favorite.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Movie,
          attributes: ["id", "title", "image"]
        }
      ]
    });

    res.json(favorites);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.checkFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { movie_id } = req.query;

    const exists = await Favorite.findOne({
      where: { user_id: userId, movie_id }
    });

    res.json({ liked: !!exists });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};