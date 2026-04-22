const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET);

const Course = require("../models/courseSchema");
const Enrollment = require("../models/enrollmentSchema");
const Payment = require("../models/paymentSchema");

// ====================================== CREATE PAYMENT SESSION
const checkoutCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    // check course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // prevent duplicate payment
    const existingPayment = await Payment.findOne({
      user: req.user.id,
      course: courseId,
      status: { $in: ["pending", "paid"] },
    });

    if (existingPayment) {
      return res.status(400).json({
        message: "You already have a payment for this course",
      });
    }

    // prevent duplicate enrollment
    const alreadyEnrolled = await Enrollment.findOne({
      user: req.user.id,
      course: courseId,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({
        message: "You are already enrolled",
      });
    }

    // create payment
    const payment = await Payment.create({
      user: req.user.id,
      course: courseId,
      amount: course.price,
      status: "pending",
    });

    // stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: course.title,
              description: course.description,
            },
            unit_amount: course.price * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/payment-success`,
      cancel_url: `${process.env.BASE_URL}/payments/cancel`,
    });

    payment.stripeSessionId = session.id;
    await payment.save();

    res.json({ url: session.url });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =============================================== SUCCESS (DISPLAY ONLY)
const paymentSuccess = (req, res) => {
  res.json({
    message: "Payment completed. Webhook will confirm and enroll.",
  });
};

// =============================================== CANCEL (UPDATED)
const paymentCancel = async (req, res) => {
  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({ message: "paymentId is required" });
    }

    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // ❌ update payment status
    payment.status = "cancelled";
    await payment.save();

    // 🔥 remove enrollment access
    await Enrollment.findOneAndDelete({
      user: payment.user,
      course: payment.course,
    });

    res.json({
      message: "Payment cancelled and access removed",
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ============================================= MY PAYMENTS
const getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user.id })
      .populate("course", "title price");

    res.json({
      message: "My payments",
      payments,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ============================================= EXPORT
module.exports = {
  checkoutCourse,
  paymentSuccess,
  paymentCancel,
  getMyPayments,
};