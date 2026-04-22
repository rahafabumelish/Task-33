import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CourseCard({ course }) {
  const navigate = useNavigate();
  const [wish, setWish] = useState(false);

  return (
    <div className="course-card">

      {/* IMAGE */}
      <div className="course-img-wrapper">

        {/* WISHLIST */}
        <div
          className={`wishlist ${wish ? "active" : ""}`}
          onClick={() => setWish(!wish)}
        >
          ❤️
        </div>

        <img
          src={
            course.image?.startsWith("http")
              ? course.image
              : `${import.meta.env.VITE_API_URL}${course.image}`
          }
          className="course-img"
        />

        {/* DURATION */}
        <div className="course-duration">
          ⏱ {course.duration || "3h 20m"}
        </div>
      </div>

      {/* CONTENT */}
      <div className="course-content">

        <h3>{course.title}</h3>

        <p>{course.description?.slice(0, 80)}...</p>

        <button onClick={() => navigate(`/course/${course._id}`)}>
          View Details
        </button>

      </div>
    </div>
  );
}

export default CourseCard;