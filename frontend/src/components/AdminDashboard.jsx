import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/courses").then((res) => {
      setCourses(res.data.courses);
    });
  }, []);

  return (
    <div className="section">
      <h2>Admin Dashboard</h2>

      <button onClick={() => navigate("/create-course")}>
        + Create Course
      </button>

      {courses.map((c) => (
        <div key={c._id}>
          <h3>{c.title}</h3>

          <button onClick={() => navigate(`/edit/${c._id}`)}>
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;