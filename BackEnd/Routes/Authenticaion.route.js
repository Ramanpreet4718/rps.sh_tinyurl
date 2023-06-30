const express = require("express");
const {handleSignIn,handleSignUp} = require("../controller/authentication.controller")

const userAuth = express.Router();

userAuth.post("/signup", handleSignUp);
userAuth.post("/signin", handleSignIn);

module.exports = userAuth;
