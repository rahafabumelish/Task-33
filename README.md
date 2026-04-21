# 🎓 Courses Platform

A full-stack web application for managing and enrolling in online courses.

---

## 🚀 Features

- User authentication (Register / Login)
- Role-based access (Student, Teacher, Admin)
- Create & manage courses
- Enroll in courses
- Payment integration using Stripe
- View enrolled courses

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication

---

## 📁 Project Structure
proj33/
│
├── backend/
│
│   ├── controllers/
│   │   ├── courseController.js
│   │   ├── enrollmentController.js
│   │   ├── paymentController.js
│   │   ├── stripeWebhookController.js
│   │   └── userController.js
│
│   ├── middleware/
│   │   ├── auth.js
│   │   └── authorizeRole.js
│
│   ├── models/
│   │   ├── db.js
│   │   ├── userSchema.js
│   │   ├── courseSchema.js
│   │   ├── enrollmentSchema.js
│   │   └── paymentSchema.js
│
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── enrollmentRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── webhookRoutes.js
│
│   ├── .env          
│   ├── .gitignore
│   ├── server.js
│   └── package.json
│
│
├── frontend/
│
│   ├── src/
│   │
│   │   ├── api/
│   │   │   └── api.js        ← 🔥 Axios helper (new)
│   │   │
│   │   ├── components/
│   │   │
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── CourseCard.jsx
│   │   │   ├── CourseDetail.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Enrollments.jsx   
│   │   │   ├── Cart.jsx    
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── CreateCourse.jsx
│   │   │   ├── EditCourse.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── index.html
│   └── package.json
│
└── README.md