import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import CourseDetail from "./components/CourseDetail";
import AdminDashboard from "./components/AdminDashboard";
import CreateCourse from "./components/CreateCourse";
import EditCourse from "./components/EditCourse";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/course/:id" element={<CourseDetail />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/create-course" element={<CreateCourse />} />
      <Route path="/edit/:id" element={<EditCourse />} />
    </Routes>
  );
}

export default App;
