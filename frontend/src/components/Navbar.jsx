
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import api from "../api/api";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [search, setSearch] = useState("");
  const [favCount, setFavCount] = useState(0);
  // 🌙 THEME STATE
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // apply theme to body
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);


  const fetchFavCount = useCallback(async () => {
    try {
      if (user?.role === "student") {
        const res = await api.get("/favorites/my");
        setFavCount(res.data.length);
      } else {
        const local = JSON.parse(localStorage.getItem("favs") || "[]");
        setFavCount(local.length);
      }
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  useEffect(() => {
    if (user?.role === "student") {
      fetchFavCount();
    }
  }, [user, fetchFavCount]);

  useEffect(() => {
    const handler = () => {
      fetchFavCount();
    };

    window.addEventListener("fav-updated", handler);

    return () => window.removeEventListener("fav-updated", handler);
  }, [fetchFavCount]);


  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    navigate(`/?search=${encodeURIComponent(search)}`);
    setSearch("");
  };

  const canSeeCart =
    user?.role === "student" || user?.role === "user";

  return (
    <div className="navbar">

      {/* LEFT */}
      <div className="nav-left">
        <div className="logo">Darbni</div>
      </div>

      {/* CENTER */}
      <div className="nav-center">
        <NavLink to="/">Home</NavLink>

        {user?.role !== "teacher" && user?.role !== "admin" && (
          <NavLink to="/favorites">
            ❤️ Favorites <span className="fav-count">{favCount}</span>
          </NavLink>
        )}

        {user?.role === "student" && (
          <NavLink to="/my-courses">My Courses</NavLink>
        )}

        {user?.role === "teacher" && (
          <NavLink to="/create-course">Create</NavLink>
        )}

        {user?.role === "admin" && (
          <NavLink to="/admin">Dashboard</NavLink>
        )}
      </div>

      {/* RIGHT */}
      <div className="nav-right">

        {!user ? (
          <>
            {/* guest */}
            <button
              className="nav-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="nav-btn primary"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </>
        ) : (
          <>
            <span className="user-badge">{user.name}</span>

            {/* 🛒 CART (ONLY student/user) */}
            {canSeeCart && (
              <button
                className="cart-btn"
                onClick={() => navigate("/cart")}
              >
                🛒
              </button>
            )}
 {/* THEME TOGGLE */}
            <button
              className="nav-btn"
              onClick={() =>
                setTheme(theme === "light" ? "dark" : "light")
              }
            >
              {theme === "light" ? "🌙 " : "☀️ "}
            </button>
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