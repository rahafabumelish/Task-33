import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    api.get(`/courses/${id}`).then((res) => {
      setCourse(res.data.course);
    });
  }, [id]);

  const enroll = async () => {
    await api.post(`/enrollments/${id}`);
    alert("Enrolled successfully!");
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div className="section">
      <h2>{course.title}</h2>
      <p>{course.description}</p>

      <button onClick={enroll}>Enroll</button>
    </div>
  );
}

export default CourseDetail;