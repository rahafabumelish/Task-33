import { useEffect, useState } from "react";
import api from "../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Enrollments() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await api.get("/enrollments/my");
        setCourses(res.data);
      } catch (err) {
        toast.error("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  const getImage = (image) => {
    if (!image) return "/default-course.jpg";
    if (image.startsWith("http")) return image;
    return `${import.meta.env.VITE_API_URL}${image}`;
  };

  if (loading) return <h2 className="loading">Loading...</h2>;

  return (
  <div className="section">
    <h2>My Courses</h2>

    {courses.length === 0 ? (
      <p>No enrolled courses yet</p>
    ) : (
      <div className="my-courses-grid">

        {courses.map((enrollment) => (
          <div
            key={enrollment._id}
            className="my-course-card"
            onClick={() =>
              navigate(`/course/${enrollment.course._id}`)
            }
          >
            <img
              src={getImage(enrollment.course.image)}
              alt={enrollment.course.title}
            />

            <div className="my-course-info">
              <h3>{enrollment.course.title}</h3>

              <p>
                {enrollment.course.description?.slice(0, 80)}...
              </p>

              <button
                className="continue-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/course/${enrollment.course._id}`);
                }}
              >
                Continue Learning
              </button>
            </div>
          </div>
        ))}

      </div>
    )}
  </div>
);
}

export default Enrollments;