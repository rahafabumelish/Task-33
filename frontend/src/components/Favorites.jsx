import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const fetchFav = async () => {
      try {
        let data = [];

        // 👤 Student (API)
        if (user?.role === "student") {
          const res = await api.get("/favorites/my");
          data = res.data;
        }

        // 👤 Guest (localStorage)
        else {
          const local = JSON.parse(localStorage.getItem("favs") || "[]");

          const res = await api.get("/courses");

          const favCourses = res.data.courses.filter((c) =>
            local.includes(c._id)
          );

          data = favCourses.map((c) => ({
            course: c,
            _id: c._id,
          }));
        }

        setFavorites(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFav();
  }, [user]);

  const getImage = (image) => {
    if (!image) return "/default-course.jpg";
    if (image.startsWith("http")) return image;
    return `${import.meta.env.VITE_API_URL}${image}`;
  };

  return (
    <div className="favorites-box">
      <h3>❤️ My Favorites</h3>

      {favorites.length === 0 ? (
        <p>No favorites yet</p>
      ) : (
        favorites.map((f) => {
          const course = f.course || f; // 

          return (
            <div
              key={f._id}
              className="favorite-item"
              onClick={() => navigate(`/course/${course._id}`)}
            >
              <img src={getImage(course.image)} />

              <div>
                <h4>{course.title}</h4>
                <p>{course.description?.slice(0, 50)}...</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Favorites;