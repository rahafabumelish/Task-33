import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";

function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  // ===================== GET DATA
  useEffect(() => {
    api.get("/courses").then((res) => {
      setCourses(res.data.courses);
    });

    api.get("/users").then((res) => {
      setUsers(res.data.users);
    });
  }, []);

  // ===================== STATS
  const totalCourses = courses.length;
  const totalUsers = users.length;

  const students = users.filter((u) => u.role === "student").length;
  const teachers = users.filter((u) => u.role === "teacher").length;
  const deleteCourse = async (id) => {
    const confirmDelete = window.confirm("Delete this course?");
    if (!confirmDelete) return;

    await api.delete(`/courses/${id}`);

    // تحديث الصفحة بدون refresh
    setCourses(courses.filter((c) => c._id !== id));
  };
  return (
    <div className="page">
      

      <div className="admin-page">
        {/* HEADER */}
        <div className="admin-header">
          <h2 className="admin-title">Admin Dashboard 👑</h2>

          <button
            className="admin-create-btn"
            onClick={() => navigate("/create-course")}
          >
            + Create Course
          </button>
        </div>

        {/* STATS */}
        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-title">Courses</div>
            <div className="stat-number">{totalCourses}</div>
          </div>

          <div className="stat-card">
            <div className="stat-title">Users</div>
            <div className="stat-number">{totalUsers}</div>
          </div>

          <div className="stat-card">
            <div className="stat-title">Students</div>
            <div className="stat-number">{students}</div>
          </div>

          <div className="stat-card">
            <div className="stat-title">Teachers</div>
            <div className="stat-number">{teachers}</div>
          </div>
        </div>

        {/* CHART (SMALL & CENTERED) */}
        <div
          className="admin-chart"
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          <h3 style={{ marginBottom: "10px" }}>Overview</h3>

          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={20}
            height={220}
            width={500}
          >
            <VictoryAxis />
            <VictoryAxis dependentAxis />

            <VictoryBar
              data={[
                { x: "Courses", y: totalCourses },
                { x: "Users", y: totalUsers },
                { x: "Students", y: students },
                { x: "Teachers", y: teachers },
              ]}
              style={{
                data: { fill: "#4f46e5" },
              }}
            />
          </VictoryChart>
        </div>

        {/* COURSES */}
        <div className="admin-courses">
          {courses.map((c) => (
            <div key={c._id} className="admin-course-card">
              <h3 className="admin-course-title">{c.title}</h3>

              <p className="admin-course-desc">
                {c.description?.slice(0, 100)}...
              </p>

              <div className="admin-actions">
                <button
                  className="admin-edit-btn"
                  onClick={() => navigate(`/edit/${c._id}`)}
                >
                  Edit
                </button>

                <button
                  className="admin-delete-btn"
                  onClick={() => deleteCourse(c._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

     
    </div>
  );
}

export default AdminDashboard;
