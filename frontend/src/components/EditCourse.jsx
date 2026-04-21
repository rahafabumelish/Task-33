import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

function EditCourse() {
  const { id } = useParams();
  const [form, setForm] = useState({});

  useEffect(() => {
    api.get(`/courses/${id}`).then((res) => {
      setForm(res.data.course);
    });
  }, [id]);

  const update = async () => {
    await api.put(`/courses/${id}`, form);
    alert("Updated!");
  };

  return (
    <div className="section">
      <h2>Edit Course</h2>

      <input
        value={form.title || ""}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        value={form.description || ""}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <button onClick={update}>Save</button>
    </div>
  );
}

export default EditCourse;