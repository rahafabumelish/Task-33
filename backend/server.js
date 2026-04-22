const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
require("./models/db");
//new
app.use(cors());

// ================= WEBHOOK ROUTE
const webhookRoutes = require("./routes/webhookRoutes");
app.use("/payments/webhook", webhookRoutes);

// ================= GLOBAL JSON
app.use(express.json());

// ================= ROUTES
app.use("/users", require("./routes/userRoutes"));
app.use("/courses", require("./routes/courseRoutes"));
app.use("/enrollments", require("./routes/enrollmentRoutes"));
app.use("/payments", require("./routes/paymentRoutes"));
app.use("/uploads", express.static("uploads"));

// ================= 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});