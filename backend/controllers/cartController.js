const Cart = require("../models/cartSchema");

exports.addToCart = async (req, res) => {
  try {
    const { courseId } = req.body;

    const exists = await Cart.findOne({
      user: req.user.id,
      course: courseId,
    });

    if (exists) {
      return res.status(400).json({
        message: "Already in cart",
      });
    }

    const cart = await Cart.create({
      user: req.user.id,
      course: courseId,
    });

    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getMyCart = async (req, res) => {
  try {
    const cart = await Cart.find({
      user: req.user.id,
    }).populate("course");

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.removeCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.json({ message: "Removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};