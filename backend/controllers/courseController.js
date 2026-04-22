const Course = require("../models/courseSchema");
const Enrollment = require("../models/enrollmentSchema");

// ============================== Create course
const createCourse = async (req, res) => {
  try {
    const { title, description, price } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Missing fields" });
    }

    if (req.user.role !== "teacher" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not allowed" });
    }

    const image = req.file
      ? `/uploads/${req.file.filename}`
      : "";

    const course = await Course.create({
      title,
      description,
      price,
      image,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Course created",
      course,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ============================== Get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("createdBy", "name email");

    res.json({
      count: courses.length,
      courses,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ============================== Get courses by id
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "createdBy",
      "name email",
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ============================== Update Course
const updateCourse = async (req, res) => {
  try {
    const { title, description, price, image } = req.body;

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (
      course.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not allowed (not owner)" });
    }

  
    let updatedImage = course.image;

    if (req.file) {
      updatedImage = `/uploads/${req.file.filename}`;
    } else if (image) {
      updatedImage = image;
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.price = price || course.price;
    course.image = updatedImage;

    await course.save();

    res.json({
      message: "Course updated",
      course,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ============================== Delete Course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (
      course.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not allowed (not owner)" });
    }

    await course.deleteOne();

    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ============================== Get Course student (SECURED)
const getCourseStudents = async (req, res) => {
  try {
    const courseId = req.params.id;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID required" });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (
      course.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const enrollments = await Enrollment.find({ course: courseId })
      .populate("user", "name email")
      .populate("course", "title price");

    res.json({
      count: enrollments.length,
      students: enrollments,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCourseStudents,
};
