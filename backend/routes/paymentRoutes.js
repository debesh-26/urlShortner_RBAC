const {
  hadlePayment,
  handlePaymentSuccess,
} = require("../controller/hadlePayment");
const authMiddleware = require("../middleware/auth");

const router = require("express").Router();

router.post("/create-checkout-session", authMiddleware, hadlePayment);
router.post("/payment-success", authMiddleware, handlePaymentSuccess);
module.exports = router;
