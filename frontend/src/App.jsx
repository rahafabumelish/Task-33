import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Register from "./components/Register";

function App() {
  return (
    <>
      {/* 🔥 Toast system */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        theme="colored"
      />

      <Routes>
        {/* redirect */}
        <Route path="/" element={<Navigate to="/register" />} />

        {/* register */}
        <Route path="/register" element={<Register />} />

        {/* لاحقاً */}
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </>
  );
}

export default App;