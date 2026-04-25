const express = require("express");
const router = express.Router();

const favoriteController = require("../controllers/favorite.controller");
const auth = require("../middleware/auth"); // 
router.get("/", auth, favoriteController.getFavorites);

module.exports = router;