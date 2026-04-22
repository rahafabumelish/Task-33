import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [id]);

  if (loading) return <h2 className="loading">Loading...</h2>;
  if (!course) return <h2>Course not found</h2>;

  return (
    <div className="course-detail-page">
      {/* LEFT */}
      <div className="course-detail-left">
        <img
          src={
            course.image?.startsWith("http")
              ? course.image
              : `${import.meta.env.VITE_API_URL}${course.image}`
          }
          alt={course.title}
          className="course-detail-img"
        />

        <div className="course-detail-content">
          <h1>{course.title}</h1>
          <p>{course.description}</p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="course-detail-right">
        <div className="course-card-box">
          <h2>${course.price}</h2>

          <p>✔ Lifetime access</p>
          <p>✔ Certificate included</p>
          <p>✔ Access on mobile & desktop</p>

          {user?.role === "student" && (
            <button className="enroll-btn">Enroll Now</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
