const mongoose = require("mongoose");
const config = require("../config/config");

async function connectDatabase() {
  try {
    mongoose.connect(config.MONGODB_URL);
    console.log("Connected to Database");
  } catch (error) {
    console.log("Could not connected to Database");
  }
}

module.exports = connectDatabase;
