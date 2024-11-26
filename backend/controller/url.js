const URL = require("../models/url");
const shortid = require("shortid");
const User = require("../models/user");

async function handleGenerteNewSortUrl(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ msg: "URL is required" });
  }
  const shortId = shortid();
  const newUrl = await URL.create({
    shortid: shortId,
    redirectUrl: body.url,
    visitedHistory: [],
    user: req.user._id,
  });
  req.user.urls.push(newUrl._id);
  await req.user.save();

  res.status(201).json(newUrl);
}

async function handleAnalytics(req, res) {
  const shortid = req.params.shortid;
  const result = await URL.findOne({ shortid, user: req.user._id });

  if (!result) {
    return res.status(404).json({ msg: "Short URL not found" });
  }

  res.status(200).json({
    totalClicks: result.visitedHistory.length,
    analytics: result.visitedHistory,
  });
}
async function handleFetchAllUrlofUser(req, res) {
  const userid = req.user.id;
  try {
    const urls = await URL.find({ user: userid });
    res.status(200).json(urls);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching URLs" });
  }
}
async function handleDeleteUrl(req, res) {
  const id = req.params.id;
  try {
    const url = await URL.findById(id);
    if (url.user.toString() != req.user.id) {
      res.status(404).json({ msg: "Not authorized to delete this URL" });
    }

    await User.findByIdAndUpdate(req.user.id, {
      $pull: { urls: req.params.id },
    });

    await URL.findByIdAndDelete(id);
    res.status(200).json({ msg: "url deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  handleGenerteNewSortUrl,
  handleAnalytics,
  handleFetchAllUrlofUser,
  handleDeleteUrl,
};
