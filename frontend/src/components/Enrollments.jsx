import { useEffect, useState } from "react";

const Enrollments = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/enrollments/my", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <h1>My Courses</h1>

      {data.map((e) => (
        <div key={e._id}>
          <h3>{e.course.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default Enrollments;