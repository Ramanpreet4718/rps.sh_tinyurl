const express = require("express");
const { generateURL, getUrl, getUserHistory } = require("../controller/rpstinyurl.controller");

const urlGeneration = express.Router();

urlGeneration.post("/newrequest", generateURL);
urlGeneration.post("/getuserhistory", getUserHistory);
urlGeneration.get("/:shorturl", getUrl);

module.exports = urlGeneration;
