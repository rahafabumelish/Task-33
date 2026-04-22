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
    const data = new FormData();

    data.append("title", form.title);
    data.append("description", form.description);
    data.append("price", form.price);

    if (imageType === "upload" && imageFile) {
      data.append("image", imageFile);
    }

    if (imageType === "url") {
      data.append("image", imageUrl);
    }

    await api.post("/courses", data);

    navigate("/admin");
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
};
  return (
    <div className="section">
      <h2>Create Course</h2>

      <input
        className="auth-input"
        placeholder="Title"
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <textarea
        className="auth-input"
        placeholder="Description"
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <input
        className="auth-input"
        type="number"
        placeholder="Price"
        onChange={(e) =>
          setForm({ ...form, price: e.target.value })
        }
      />

      {/* اختيار نوع الصورة */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setImageType("url")}>URL</button>
        <button onClick={() => setImageType("upload")}>Upload</button>
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