import { useEffect, useState } from "react";
import api from "../api/api";

function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    api.get("/enrollments/my").then((res) => {
      setEnrollments(res.data.enrollments);
    });
  }, []);

  return (
    <div className="section">
      <h2>My Courses</h2>

      {enrollments.map((e) => (
        <div key={e._id}>
          <h3>{e.course.title}</h3>
        </div>
      ))}
    </div>
  );
}

export default Enrollments;