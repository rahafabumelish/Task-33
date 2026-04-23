import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function CreateCourse() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
  });

  const [imageType, setImageType] = useState("url");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
const navigate = useNavigate();
  const create = async () => {
    try {
      if (!form.title || !form.description) return;

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

      await api.post("/courses", data);

      navigate("/admin");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const handleTypeChange = (type) => {
    setImageType(type);
    setImageFile(null);
    setImageUrl("");
  };
  return (
    <div className="section">
      <h2>Create Course</h2>

      <input
        className="auth-input"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        className="auth-input"
        placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        className="auth-input"
        type="number"
        placeholder="Price"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      
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

      {/* URL */}
      {imageType === "url" && (
        <input
          className="auth-input"
          placeholder="Image URL"
          onChange={(e) => setImageUrl(e.target.value)}
        />
      )}

      {/* Upload */}
      {imageType === "upload" && (
        <input
          className="auth-input"
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
      )}

      <button className="auth-button" onClick={create}>
        Create Course
      </button>
    </div>
  );
}

export default CreateCourse;
