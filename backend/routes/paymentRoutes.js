const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  checkoutCourse,
  paymentSuccess,
  paymentCancel,
  getMyPayments,
} = require("../controllers/paymentController");

// 💳 checkout
router.post("/checkout", auth, checkoutCourse);

// ✅ success (Stripe redirect only)
router.get("/success", paymentSuccess);

// ❌ cancel
router.post("/cancel", paymentCancel);

// 📊 my payments
router.get("/my", auth, getMyPayments);

module.exports = router;