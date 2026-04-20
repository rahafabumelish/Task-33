import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", width: "200px" }}>
      <h3>{course.title}</h3>
      <p>{course.price}$</p>

      <Link to={`/course/${course._id}`}>View</Link>
    </div>
  );
};

export default CourseCard;