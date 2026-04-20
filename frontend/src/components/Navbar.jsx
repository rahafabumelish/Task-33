import { Link } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ padding: "10px", background: "#ddd" }}>
      <Link to="/">Home</Link>

      {user ? (
        <>
          <Link to="/enrollments">My Courses</Link>
          <Link to="/cart">Checkout</Link>
          {user.role === "admin" && <Link to="/admin">Admin</Link>}
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </div>
  );
};

export default Navbar;