import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`http://localhost:5000/courses/${id}`)
      .then((res) => res.json())
      .then((data) => setCourse(data));
  }, [id]);

  const enroll = async () => {
    const res = await fetch("http://localhost:5000/enrollments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ courseId: id }),
    });

    const data = await res.json();
    alert(data.message);
  };

  const pay = async () => {
    const res = await fetch("http://localhost:5000/payments/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ courseId: id }),
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div>
      <h1>{course.title}</h1>
      <p>{course.description}</p>

      {course.price === 0 ? (
        <button onClick={enroll}>Enroll Free</button>
      ) : (
        <button onClick={pay}>Pay</button>
      )}
    </div>
  );
};

export default CourseDetail;