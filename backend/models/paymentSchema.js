const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },

    amount: Number,

    status: {
      type: String,
      enum: ["pending", "paid", "failed", "cancelled"], 
      default: "pending",
    },

    stripeSessionId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);