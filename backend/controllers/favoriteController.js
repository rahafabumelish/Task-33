const Favorite = require("../models/favoriteSchema");

// ============================== TOGGLE FAVORITE
const toggleFavorite = async (req, res) => {
  try {
    const { courseId } = req.body;

    const exists = await Favorite.findOne({
      user: req.user.id,
      course: courseId,
    });

    // ❌ إذا موجود نحذفه
    if (exists) {
      await exists.deleteOne();
      return res.json({ isFavorite: false });
    }

    // ✅ إذا مش موجود نضيفه
    await Favorite.create({
      user: req.user.id,
      course: courseId,
    });

    return res.json({ isFavorite: true });

  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// ============================== GET MY FAVORITES
const getMyFavorites = async (req, res) => {
  try {
    const favs = await Favorite.find({
      user: req.user.id,
    }).populate("course");

    return res.json(favs);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  toggleFavorite,
  getMyFavorites,
};