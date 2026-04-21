import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function CreateCourse() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const create = async () => {
    await api.post("/courses", form);
    navigate("/admin");
  };

  return (
    <div className="section">
      <h2>Create Course</h2>

      <input placeholder="Title" onChange={(e) =>
        setForm({ ...form, title: e.target.value })} />

      <textarea placeholder="Description" onChange={(e) =>
        setForm({ ...form, description: e.target.value })} />

      <button onClick={create}>Create</button>
    </div>
  );
}

export default CreateCourse;