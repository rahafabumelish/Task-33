const express = require("express");
const router = express.Router();

const {
  enrollCourse,
  getMyCourses,
  unenrollCourse,
} = require("../controllers/enrollmentController");

const auth = require("../middleware/auth");
const authorizeRoles = require("../middleware/authorizeRole");

// ====================== My courses (Student only)
router.get("/my", auth, authorizeRoles("student"), getMyCourses);

// ========================= Enroll in course (Student only)
router.post("/", auth, authorizeRoles("student"), enrollCourse);

// =========================== Unenroll (Student only)
router.delete("/:courseId", auth, authorizeRoles("student"), unenrollCourse);

module.exports = router;