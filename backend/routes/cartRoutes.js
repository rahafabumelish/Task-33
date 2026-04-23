const router = require("express").Router();

const {
  addToCart,
  getMyCart,
  removeCart,
} = require("../controllers/cartController");

const auth = require("../middleware/auth");

router.post("/add", auth, addToCart);
router.get("/my", auth, getMyCart);
router.delete("/:id", auth, removeCart);

module.exports = router;