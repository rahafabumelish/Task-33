import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/api";
import { toast } from "react-toastify";


function CourseCard({ course }) {
  const navigate = useNavigate();

  const [wish, setWish] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  // ================= LOCAL STORAGE (guest)
  const getLocalFavs = () => {
    return JSON.parse(localStorage.getItem("favs") || "[]");
  };

  const saveLocalFavs = (favs) => {
    localStorage.setItem("favs", JSON.stringify(favs));
  };

  // ================= IMAGE
  const getImage = () => {
    if (!course?.image) return "/default-course.jpg";
    if (course.image.startsWith("http")) return course.image;
    return `${import.meta.env.VITE_API_URL}${course.image}`;
  };

  // ================= CHECK ENROLLMENT
  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const res = await api.get("/enrollments/my");

        const enrolled = res.data.some(
          (e) => e.course._id === course._id
        );

        setIsEnrolled(enrolled);
      } catch (err) {
        console.log(err);
      }
    };

    if (user?.role === "student") {
      checkEnrollment();
    }
  }, [course._id]);

  // ================= CHECK FAVORITE
  useEffect(() => {
    const checkFav = async () => {
      try {
        if (user?.role === "student") {
          const res = await api.get("/favorites/my");

          const exists = res.data.some(
            (f) => f.course._id === course._id
          );

          setWish(exists);
        } else {
          const favs = getLocalFavs();
          setWish(favs.includes(course._id));
        }
      } catch (err) {
        console.log(err);
      }
    };

    checkFav();
  }, [course._id, user?.role]);

  // ================= TOGGLE FAVORITE
const toggleFavorite = async () => {
  try {
    // 👤 student (backend)
    if (user?.role === "student") {
      const res = await api.post("/favorites", {
        courseId: course._id,
      });

      setWish(res.data.isFavorite);
    }

    // 👤 guest (localStorage)
    else {
      let favs = getLocalFavs();

      if (favs.includes(course._id)) {
        favs = favs.filter((id) => id !== course._id);
        setWish(false);
      } else {
        favs.push(course._id);
        setWish(true);
      }

      saveLocalFavs(favs);
    }

    // 🔥 تحديث navbar
    window.dispatchEvent(new Event("fav-updated"));

  } catch (err) {
    console.log(err);
  }
};

const addToCart = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.info("Please login first");
    navigate("/login");
    return;
  }

  try {
    await api.post("/cart/add", {
      courseId: course._id,
    });

    toast.success("Added to cart");
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed");
  }
};

  return (
    <div className="course-card">

      <div className="course-img-wrapper">

        <div
          className={`wishlist ${wish ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite();
          }}
        >
          {wish ? "💖" : "🤍"}
        </div>

        <img
          src={getImage()}
          className="course-img"
          alt={course?.title || "course"}
          onError={(e) => {
            e.target.src = "/default-course.jpg";
          }}
        />

        <div className="course-duration">
          ⏱ {course?.duration || "3h 20m"}
        </div>
      </div>

      <div className="course-content">

        <h3>{course?.title || "Untitled Course"}</h3>

        <p>
          {course?.description
            ? course.description.slice(0, 80)
            : "No description available"}
          ...
        </p>

        {course?.price !== undefined && (
          <div className="course-price">{course.price}$</div>
        )}

        <button onClick={() => navigate(`/course/${course._id}`)}>
          {user?.role === "student" && isEnrolled
            ? "Continue Learning"
            : "View Details"}
        </button>
        <button className="cart-add-btn" onClick={addToCart}>
  Add To Cart
</button>

      </div>
    </div>
  );
}

export default CourseCard;