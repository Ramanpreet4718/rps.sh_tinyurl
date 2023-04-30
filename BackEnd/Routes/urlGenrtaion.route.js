const express = require("express");
const { generateURL, getUrl } = require("../controller/rpstinyurl.controller");

const urlGeneration = express.Router();

urlGeneration.post("/newrequest", generateURL);
urlGeneration.get("/:shorturl", getUrl);

module.exports = urlGeneration;
