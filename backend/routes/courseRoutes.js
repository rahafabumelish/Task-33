const express = require("express");
const router = express.Router();

const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCourseStudents,
} = require("../controllers/courseController");
const upload = require("../middleware/upload");

const auth = require("../middleware/auth");
const authorizeRole = require("../middleware/authorizeRole");

// ===================================== Create (Teacher + Admin)
router.post(
  "/",
  auth,
  authorizeRole("teacher", "admin"),
  upload.single("image"),
  createCourse
);

// ===================================== Update (Teacher + Admin)
router.put(
  "/:id",
  auth,
  authorizeRole("teacher", "admin"),
  upload.single("image"),
  updateCourse
);
// ===================================== Delete (Admin only)
router.delete("/:id", auth, authorizeRole("admin"), deleteCourse);

// ===================================== Course STUDENTS (Teacher + Admin)
router.get(
  "/:id/students",
  auth,
  authorizeRole("teacher", "admin"),
  getCourseStudents
);

// all PUBLIC
router.get("/", getAllCourses);
router.get("/:id", getCourseById);

module.exports = router;