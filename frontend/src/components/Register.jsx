import { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "../App.css";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(form.email))
      newErrors.email = "Invalid email format";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "At least 6 characters";

    if (!form.confirmPassword)
      newErrors.confirmPassword = "Confirm your password";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const { confirmPassword, ...data } = form;

    try {
      await api.post("/users/register", data);

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

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  return (
    <div className="auth-container">

      {/* LEFT */}
      <div className="auth-left">
        <h1>Learn Anytime</h1>
        <p>Join thousands of students and improve your skills</p>
      </div>

      {/* RIGHT */}
      <div className="auth-right">
        <form onSubmit={handleSubmit} className="auth-form">

          <h2 className="auth-title">Create Account</h2>

          <input
            className="auth-input"
            placeholder="Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          {errors.name && <p className="auth-error">{errors.name}</p>}

          <input
            className="auth-input"
            placeholder="Email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          {errors.email && <p className="auth-error">{errors.email}</p>}

          {/* PASSWORD */}
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              className="auth-input"
              placeholder="Password"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
          </div>
          {errors.password && <p className="auth-error">{errors.password}</p>}

          {/* CONFIRM PASSWORD */}
          <div className="password-field">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="auth-input"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
            />
            <span
              className="eye-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="auth-error">{errors.confirmPassword}</p>
          )}

          {/* ROLE */}
          <div className="select-wrapper">
            <select
              className="auth-select"
              value={form.role}
              onChange={(e) => handleChange("role", e.target.value)}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <button className="auth-button">Register</button>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>

        </form>
      </div>

    </div>
  );
}

export default Register;