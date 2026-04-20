const express = require("express");
const router = express.Router();

const {
  register,
  login,
  me,
  forgotPassword,
  resetPassword
} = require("../controllers/userController");

const auth = require("../middleware/auth");
const authorizeRoles = require("../middleware/authorizeRole");

// ================= Public Routes
router.post("/register", register);
router.post("/login", login);

// ================= Protected Routes
router.get("/me", auth, me);

// ================= Admin only
router.get("/all-users", auth, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Only admin can see this" });
});
// ========================== forgot password
router.post("/forgot-password", forgotPassword);

// ========================== reset password
router.post("/reset-password", resetPassword);

module.exports = router;