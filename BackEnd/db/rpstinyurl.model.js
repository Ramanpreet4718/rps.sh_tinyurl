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
  auther: {
    _id: mongoose.Types.ObjectId,
    email: String,
    name: String,
  },
  visitHistory: [Date],
},
  { timestamps: true }
);

const shortURL = mongoose.model("urldatabase", UrlSchema);

module.exports = shortURL;
