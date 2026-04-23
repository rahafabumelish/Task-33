const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  toggleFavorite,
  getMyFavorites,
} = require("../controllers/favoriteController");

router.post("/", auth, toggleFavorite);
router.get("/my", auth, getMyFavorites);

module.exports = router;