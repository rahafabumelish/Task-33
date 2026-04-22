import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/api";

function CourseCard({ course }) {
  const navigate = useNavigate();
  const [wish, setWish] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const getImage = () => {
    if (!course?.image) return "/default-course.jpg";
    if (course.image.startsWith("http")) return course.image;
    return `${import.meta.env.VITE_API_URL}${course.image}`;
  };

  // ================= CHECK IF ENROLLED
  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const res = await api.get("/enrollments/my");

        const enrolled = res.data.some(
          (e) => e.course._id === course._id
        );

        setIsEnrolled(enrolled);
      } catch (err) {
        console.log(err);
      }
    };

    if (user?.role === "student") {
      checkEnrollment();
    }
  }, [course._id]);

  return (
    <div className="course-card">

      {/* IMAGE */}
      <div className="course-img-wrapper">

        {/* WISHLIST */}
        <div
          className={`wishlist ${wish ? "active" : ""}`}
          onClick={() => setWish(!wish)}
        >
          {wish ? "💖" : "🤍"}
        </div>

        <img
          src={getImage()}
          className="course-img"
          alt={course?.title || "course"}
          onError={(e) => {
            e.target.src = "/default-course.jpg";
          }}
        />

        <div className="course-duration">
          ⏱ {course?.duration || "3h 20m"}
        </div>
      </div>

      {/* CONTENT */}
      <div className="course-content">

        <h3>{course?.title || "Untitled Course"}</h3>

        <p>
          {course?.description
            ? course.description.slice(0, 80)
            : "No description available"}
          ...
        </p>

        {course?.price !== undefined && (
          <div className="course-price">{course.price}$</div>
        )}

        {/* BUTTON */}
        <button
          onClick={() => navigate(`/course/${course._id}`)}
        >
          {user?.role === "student" && isEnrolled
            ? "Continue Learning"
            : "View Details"}
        </button>

      </div>
    </div>
  );
}

export default CourseCard;