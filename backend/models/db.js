//===================================== connect to database
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB connection error:", err));