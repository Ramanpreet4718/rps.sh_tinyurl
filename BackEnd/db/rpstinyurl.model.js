const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  redirectId: {
    type: String,
    required: true,
  },
  visitHistory: [Date],
});

const shortURL = mongoose.model("urldatabase", UrlSchema);

module.exports = shortURL;
