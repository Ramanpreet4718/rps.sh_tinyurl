const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  tinyUrl: {
    type: String,
    required: true,
    unique: true,
  },
  redirectUrl: {
    type: String,
    required: true,
  },
  visitHistory: [Date],
});

const shortURL = mongoose.model("urldatabase", UrlSchema);

module.exports = shortURL;
