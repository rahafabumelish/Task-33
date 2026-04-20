import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../App.css";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/[A-Z]/.test(form.password)) {
      newErrors.password = "Must contain uppercase letter";
    } else if (!/[0-9]/.test(form.password)) {
      newErrors.password = "Must contain a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await axios.post("http://localhost:5000/users/register", form);

      toast.success("Registered successfully");

      setTimeout(() => {
        navigate("/login");
      }, 800);

    } catch (err) {
      const msg = err.response?.data?.message;

      if (msg === "Email already exists") {
        setErrors({ email: "Email already used" });
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="auth-title">Create Account</h2>

        <input
          className="auth-input"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        {errors.name && <p className="auth-error">{errors.name}</p>}

        <input
          className="auth-input"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        {errors.email && <p className="auth-error">{errors.email}</p>}

        <input
          type="password"
          className="auth-input"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />
        {errors.password && (
          <p className="auth-error">{errors.password}</p>
        )}

        {/* 👇 role اختيار بين teacher/student فقط */}
        <select
          className="auth-input"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <button className="auth-button">Register</button>
      </form>
    </div>
  );
}

export default Register;