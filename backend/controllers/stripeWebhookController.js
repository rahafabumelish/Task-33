const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET);

const Payment = require("../models/paymentSchema");
const Enrollment = require("../models/enrollmentSchema");

const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      const payment = await Payment.findOne({
        stripeSessionId: session.id,
      });

      if (!payment) return res.json({ received: true });

      if (payment.status === "paid") {
        return res.json({ received: true });
      }

      payment.status = "paid";
      await payment.save();

      const exists = await Enrollment.findOne({
        user: payment.user,
        course: payment.course,
      });

      if (!exists) {
        await Enrollment.create({
          user: payment.user,
          course: payment.course,
        });
      }

      console.log("✅ Webhook: payment success + enrolled");

    } catch (err) {
      console.log("Webhook error:", err.message);
    }
  }

  res.json({ received: true });
};

module.exports = { stripeWebhook };