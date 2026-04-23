const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
require("./models/db");

// ================= CORS
app.use(cors());

// ================= WEBHOOK (IMPORTANT - BEFORE JSON)
app.use("/payments/webhook", require("./routes/webhookRoutes"));

// ================= JSON FOR NORMAL ROUTES
app.use(express.json());

// ================= ROUTES
app.use("/users", require("./routes/userRoutes"));
app.use("/courses", require("./routes/courseRoutes"));
app.use("/enrollments", require("./routes/enrollmentRoutes"));
app.use("/payments", require("./routes/paymentRoutes"));
app.use("/uploads", express.static("uploads"));
app.use("/favorites", require("./routes/favoriteRoutes"));

app.use("/cart",  require("./routes/cartRoutes"));

// ================= 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT ;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});