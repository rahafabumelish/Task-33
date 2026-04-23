import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import CourseDetail from "./components/CourseDetail";
import AdminDashboard from "./components/AdminDashboard";
import CreateCourse from "./components/CreateCourse";
import EditCourse from "./components/EditCourse";
import PaymentSuccess from "./components/PaymentSuccess";
import Cart from "./components/Cart";
import Enrollments from "./components/Enrollments";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Favorites from "./components/Favorites";

function App() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="page">
      {!isAuthPage && <Navbar />}
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/create-course" element={<CreateCourse />} />
          <Route path="/edit/:id" element={<EditCourse />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/my-courses" element={<Enrollments />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        style={{ zIndex: 99999 }}
      />
    </div>
  );
}

export default App;
