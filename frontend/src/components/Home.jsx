import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data.courses));
  }, []);

  return (
    <div>
      <h1>Courses</h1>

      {courses.map((c) => (
        <div key={c._id}>
          <h3>{c.title}</h3>
          <p>{c.price}$</p>
          <Link to={`/course/${c._id}`}>View</Link>
        </div>
      ))}
    </div>
  );
};

export default Home;