const express = require("express");
const router = express.Router();

const favoriteController = require("../controllers/favorite.controller");
const auth = require("../middleware/auth");

// ✅ lấy danh sách
router.get("/", auth, favoriteController.getFavorites);

// ✅ toggle like
router.post("/", auth, favoriteController.toggleFavorite);

// ✅ check liked
router.get("/check", auth, favoriteController.checkFavorite);

module.exports = router;