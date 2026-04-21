import { useNavigate } from "react-router-dom";

function CourseCard({ course }) {
  const navigate = useNavigate();

  return (
    <div className="course-card">
      <h3>{course.title}</h3>
      <p>{course.description?.slice(0, 80)}...</p>

      <button onClick={() => navigate(`/course/${course._id}`)}>
        View Course
      </button>
    </div>
  );
}

export default CourseCard;