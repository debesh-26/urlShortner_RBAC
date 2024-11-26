const User = require("../models/user");
const Razorpay = require("razorpay");
const dotenv = require("dotenv");
dotenv.config();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function hadlePayment(req, res) {
  try {
    const order = await razorpayInstance.orders.create({
      amount: 50000,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    });

    console.log("Order created successfully:", order);
    res.json(order);
  } catch (error) {
    console.error("Error creating payment order:", error);
    res.status(500).json({ message: "Payment creation failed", error: error });
  }
}

async function handlePaymentSuccess(req, res) {
  try {
    const { paymentId } = req.body;
    const userId = req.user.id;

    await User.findByIdAndUpdate(userId, {
      $set: { urlLimit: 50, paidService: true }, 
    });

    res
      .status(200)
      .json({ message: "Payment successful. You can now shorten more URLs." });
  } catch (error) {
    res.status(500).json({ message: "Payment confirmation failed" });
  }
}
module.exports = { hadlePayment, handlePaymentSuccess };
