const Course = require("../models/courseSchema");
const Enrollment = require("../models/enrollmentSchema");
const Payment = require("../models/paymentSchema");

const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // check already enrolled
    const exists = await Enrollment.findOne({
      user: req.user.id,
      course: courseId,
    });

    if (exists) {
      return res.status(400).json({
        message: "You are already enrolled",
      });
    }

    // ================= FREE COURSE
    if (course.price === 0) {
      const enrollment = await Enrollment.create({
        user: req.user.id,
        course: courseId,
      });

      return res.json({
        message: "Free course enrolled successfully",
        enrollment,
      });
    }

    // ================= PAID COURSE
    const payment = await Payment.findOne({
      user: req.user.id,
      course: courseId,
      status: "paid",
    });

    if (!payment) {
      return res.status(400).json({
        message: "You must pay first",
      });
    }

    const enrollment = await Enrollment.create({
      user: req.user.id,
      course: courseId,
    });

    res.json({
      message: "Paid course enrolled successfully",
      enrollment,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//===================================== My Courses
const getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user.id })
      .populate("course");

    // 🔥 فلترة أي كورس محذوف أو null
    const safeEnrollments = enrollments.filter(
      (e) => e.course !== null
    );

    res.json(safeEnrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const unenrollCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const enrollment = await Enrollment.findOneAndDelete({
      user: req.user.id,
      course: courseId,
    });

    if (!enrollment) {
      return res.status(404).json({
        message: "You are not enrolled in this course",
      });
    }

    res.json({
      message: "Unenrolled successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  enrollCourse,
  getMyCourses,
  unenrollCourse,
};
