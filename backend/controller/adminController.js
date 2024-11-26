const User = require("../models/user");
const Url = require("../models/url");

async function getAllUsersAndUrls(req, res) {
  try {
    const users = await User.find().populate("urls");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function deleteAUser(req, res) {
  try {
    const userId = req.params.id;
    await Url.deleteMany({ user: userId });
    await User.findByIdAndDelete(userId);
    res.json({ message: "User and their URLs deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function editUsersUrl(req, res) {
  try {
    const id = req.params.id;
    const { shortid, redirectUrl } = req.body;
    const updatedUrl = await Url.findByIdAndUpdate(
      id,
      { shortid, redirectUrl },
      {
        new: true,
      }
    );

    if (!updatedUrl) {
      return res.status(404).json({ message: "URL not found" });
    }

    res.json(updatedUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteUserUrl(req, res) {
  try {
    const urlId = req.params.id;

    const deletedUrl = await Url.findByIdAndDelete(urlId);

    if (!deletedUrl) {
      return res.status(404).json({ message: "URL not found" });
    }

    res.json({ message: "URL deleted successfully", deletedUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllUsersAndUrls,
  deleteAUser,
  editUsersUrl,
  deleteUserUrl,
};
