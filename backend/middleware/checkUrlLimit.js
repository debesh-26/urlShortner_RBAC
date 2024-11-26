const User = require("../models/user");

const checkUrlLimit = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.urls.length >= user.urlLimit) {
      return res
        .status(200)
        .json({ msg: "Free limit exceeded. Please upgrade to continue." });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Error checking limit" });
  }
};

module.exports=checkUrlLimit;