import { useEffect, useState } from "react";
import { useParams ,useNavigate  } from "react-router-dom";
import api from "../api/api";
import { toast } from "react-toastify";

function CourseDetail() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingEnroll, setLoadingEnroll] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // ================= FETCH COURSE
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

  // ================= CHECK ENROLLMENT
  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const res = await api.get("/enrollments/my");

        const enrolled = res.data.some(
          (e) => e.course._id === id
        );

        setIsEnrolled(enrolled);
      } catch (err) {
        console.log(err);
      }
    };

    checkEnrollment();
  }, [id]);

  // ================= FREE ENROLL
  const enrollFree = async () => {
    try {
      setLoadingEnroll(true);

      const res = await api.post("/enrollments", {
        courseId: id,
      });

      toast.success(res.data.message || "Enrolled successfully 🎉");
      setIsEnrolled(true); 
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to enroll");
    } finally {
      setLoadingEnroll(false);
    }
  };

  // ================= PAID COURSE
  const payCourse = async () => {
    try {
      setLoadingEnroll(true);

      const res = await api.post("/payments/checkout", {
        courseId: id,
      });

      window.location.href = res.data.url;
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment failed");
    } finally {
      setLoadingEnroll(false);
    }
  };

const handleEnroll = () => {
  if (!course || loadingEnroll) return;

  // 👤 guest → login
  if (!user) {
    toast.info("Please login first");
    navigate("/login");
    return;
  }

  // 👨‍🏫 admin / teacher safety
  if (user.role !== "student") return;

  if (Number(course.price) === 0) {
    enrollFree();
  } else {
    payCourse();
  }
};

  // ================= IMAGE
  const getImage = () => {
    if (!course?.image) return "/default-course.jpg";
    if (course.image.startsWith("http")) return course.image;
    return `${import.meta.env.VITE_API_URL}${course.image}`;
  };

  if (loading) return <h2 className="loading">Loading...</h2>;
  if (!course) return <h2>Course not found</h2>;

  return (
    <div className="course-detail-page">

      {/* LEFT */}
      <div className="course-detail-left">
        <img
          src={getImage()}
          alt={course?.title || "course"}
          className="course-detail-img"
          onError={(e) => {
            e.target.src = "/default-course.jpg";
          }}
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

{(!user || user.role === "student") && (            !isEnrolled ? (
              <button
                className="enroll-btn"
                onClick={handleEnroll}
                disabled={loadingEnroll}
              >
                {loadingEnroll
                  ? "Processing..."
                  : course.price === 0
                    ? "Enroll Now"
                    : "Pay & Enroll"}
              </button>
            ) : (
              <button className="enroll-btn enrolled" disabled>
                Already Enrolled
              </button>
            )
          )}
        </div>
      </div>

    </div>
  );
}

export default CourseDetail;