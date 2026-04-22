
import Footer from "./Footer";
import CourseCard from "./CourseCard";
import api from "../api/api";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Home() {
  const [courses, setCourses] = useState([]);
  const location = useLocation();

  const search =
    new URLSearchParams(location.search).get("search")?.toLowerCase() || "";

  useEffect(() => {
    api.get("/courses").then((res) => {
      setCourses(res.data.courses);
    });
  }, []);

  const filteredCourses = search
    ? courses.filter((c) =>
        c.title.toLowerCase().includes(search)
      )
    : courses;

  return (
    <div className="page">

      

      <div className="page-content">

        <div className="hero">
          <h1>Learn Skills That Matter 🚀</h1>

          {search && (
            <p>
              Search results for: <b>{search}</b>
            </p>
          )}
        </div>

        <div className="section">
          <h2>Popular Courses</h2>

          <div className="courses">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((c) => (
                <CourseCard key={c._id} course={c} />
              ))
            ) : (
              <p>No courses found 😢</p>
            )}
          </div>

        </div>

      </div>

     
    </div>
  );
}

export default Home;