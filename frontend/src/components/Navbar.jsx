import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [search, setSearch] = useState("");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    navigate(`/?search=${search}`);
    setSearch(""); // تنظيف input بعد البحث
  };

  return (
    <div className="navbar">

      {/* LEFT */}
      <div className="nav-left">
        <div className="logo">CourseHub</div>
      </div>

      {/* CENTER LINKS حسب الدور */}
      <div className="nav-center">
        <NavLink to="/">Home</NavLink>

        {user?.role === "student" && (
          <NavLink to="/">Courses</NavLink>
        )}

        {user?.role === "teacher" && (
          <>
            <NavLink to="/">Courses</NavLink>
            <NavLink to="/create-course">Create</NavLink>
          </>
        )}

        {user?.role === "admin" && (
          <Link to="/admin">Dashboard</Link>
        )}
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        {!user ? (
          <>
            <button className="nav-btn" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="nav-btn primary" onClick={() => navigate("/register")}>
              Register
            </button>
          </>
        ) : (
          <>
            <span className="user-badge">{user.name}</span>
            <button className="nav-btn danger" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>

      {/* SEARCH */}
      <form className="nav-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

    </div>
  );
}

export default Navbar;