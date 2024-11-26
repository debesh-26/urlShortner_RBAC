
const {
  handleGenerteNewSortUrl,
  handleAnalytics,
  handleFetchAllUrlofUser,
  handleDeleteUrl,
} = require("../controller/url");
const authMiddleware = require("../middleware/auth");
const checkUrlLimit = require("../middleware/checkUrlLimit");

const router = require("express").Router();

router.post("/", authMiddleware,checkUrlLimit, handleGenerteNewSortUrl);
router.get("/analytics/:shortid", authMiddleware, handleAnalytics);
router.get("/user", authMiddleware, handleFetchAllUrlofUser);
router.delete("/:id", authMiddleware, handleDeleteUrl);
module.exports = router;
