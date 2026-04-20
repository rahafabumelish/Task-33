import { useState } from "react";

const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const create = async () => {
    await fetch("http://localhost:5000/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, description, price }),
    });

    alert("Created");
  };

  return (
    <div>
      <input onChange={(e) => setTitle(e.target.value)} placeholder="title" />
      <input onChange={(e) => setDescription(e.target.value)} placeholder="desc" />
      <input onChange={(e) => setPrice(e.target.value)} placeholder="price" />
      <button onClick={create}>Create</button>
    </div>
  );
};

export default CreateCourse;