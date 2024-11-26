const { handleRegister, handleLogin } = require("../controller/auth");
const router = require("express").Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);

module.exports = router;
