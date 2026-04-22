import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
  });

  const [imageType, setImageType] = useState("url");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);

        setForm({
          title: res.data.title || "",
          description: res.data.description || "",
          price: res.data.price || "",
        });

        setImageUrl(res.data.image || "");
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleTypeChange = (type) => {
    setImageType(type);
    setImageFile(null);
    setImageUrl("");
  };

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
    <div className="section">
      <h2>Edit Course</h2>

      <input
        className="auth-input"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        className="auth-input"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        className="auth-input"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      {/* toggle */}
      <div className="image-toggle">
        <button
          className={imageType === "url" ? "active" : ""}
          onClick={() => handleTypeChange("url")}
        >
          URL
        </button>

        <button
          className={imageType === "upload" ? "active" : ""}
          onClick={() => handleTypeChange("upload")}
        >
          Upload
        </button>
      </div>

      {/* input */}
      {imageType === "url" ? (
        <input
          className="auth-input"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      ) : (
        <input
          className="auth-input"
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
      )}

      <button className="auth-button" onClick={update}>
        Save Changes
      </button>
    </div>
  );
}

export default EditCourse;