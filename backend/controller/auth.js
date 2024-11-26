const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


async function handleRegister(req, res) {
  const { email, password ,role} = req.body;
  if (!email || !password)
    return res.status(400).json({ msg: "Email and Password are required" });

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ msg: "User Already exist" });

  const userRole = role || 'user';

  const user = new User({
    email,
    password,
    role:userRole,
  });
  await user.save();
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.status(201).json({ token });
}

async function handleLogin(req, res) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ msg: "email and password is requied" });
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ msg: "user not found" });
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id , role: user.role}, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.status(200).json({ token ,user});
}

module.exports = { handleRegister, handleLogin };
