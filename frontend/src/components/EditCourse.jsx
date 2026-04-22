import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
  });

  const [imageType, setImageType] = useState("url");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const [loading, setLoading] = useState(true);

  // 🔥 جلب البيانات
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);

        setForm({
          title: res.data.title,
          description: res.data.description,
          price: res.data.price,
        });

        setImageUrl(res.data.image || "");

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // 🔥 تحديث
  const update = async () => {
    try {
      const data = new FormData();

      data.append("title", form.title);
      data.append("description", form.description);
      data.append("price", form.price);

      if (imageType === "upload" && imageFile) {
        data.append("image", imageFile);
      }

      if (imageType === "url" && imageUrl) {
        data.append("image", imageUrl);
      }

      await api.put(`/courses/${id}`, data);

      navigate("/admin");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="edit-container">

      <h2 className="edit-title">Edit Course </h2>

      {/* ================= FORM ================= */}
      <div className="edit-form">

        <input
          className="auth-input"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <textarea
          className="auth-input"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          className="auth-input"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        {/* ================= TABS ================= */}
        <div className="tabs">
          <button
            className={imageType === "url" ? "active-tab" : ""}
            onClick={() => setImageType("url")}
          >
            URL
          </button>

          <button
            className={imageType === "upload" ? "active-tab" : ""}
            onClick={() => setImageType("upload")}
          >
            Upload
          </button>
        </div>

        {/* ================= INPUT ================= */}
        {imageType === "url" ? (
          <input
            className="auth-input"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        ) : (
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        )}

        {/* ================= PREVIEW ================= */}
        <div className="preview">
          <p>Preview:</p>

          <img
            src={
              imageType === "upload" && imageFile
                ? URL.createObjectURL(imageFile)
                : imageUrl?.startsWith("http")
                ? imageUrl
                : `${import.meta.env.VITE_API_URL}${imageUrl}`
            }
            alt="preview"
          />
        </div>

        {/* ================= BUTTON ================= */}
        <button className="auth-button" onClick={update}>
          Save Changes
        </button>

      </div>
    </div>
  );
}

export default EditCourse;