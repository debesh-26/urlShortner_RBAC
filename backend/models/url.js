const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
  {
    shortid: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitedHistory: [],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  
      required: true
    }
  },
  { timestamps: true }
);

const URL = mongoose.model("urlShortner", urlSchema);
module.exports = URL;
