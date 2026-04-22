import { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../App.css";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await api.post("/users/login", form);

      // 🔐 token + user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful");

      // 🎯 redirect حسب role
      const role = res.data.user.role;

      setTimeout(() => {
        if (role === "admin") navigate("/admin");
        else navigate("/");
      }, 800);

    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">

      {/* LEFT */}
      <div className="auth-left">
        <h1>Welcome Back 👋</h1>

        <p>
          Continue your journey, learn new skills and grow your career with us.
        </p>

        <div className="features">
          <p>🚀 Learn at your own pace</p>
          <p>📚 Access hundreds of courses</p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="auth-right">
        <form onSubmit={handleSubmit} className="auth-form">

          <h2 className="auth-title">Login</h2>

          <input
            className="auth-input"
            placeholder="Email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          {errors.email && <p className="auth-error">{errors.email}</p>}

          <input
            type="password"
            className="auth-input"
            placeholder="Password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          {errors.password && <p className="auth-error">{errors.password}</p>}

          <button className="auth-button">Login</button>

          <p className="auth-switch">
            Don’t have an account? <Link to="/register">Register</Link>
          </p>

        </form>
      </div>

    </div>
  );
}

export default Login;