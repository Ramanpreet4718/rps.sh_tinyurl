const express = require("express");
const connectDatabase = require("./db/connectDatabase");
const { generateURL, getUrl } = require("./controller/rpstinyurl.controller");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(morgan("tiny"));

//request functions
app.post("/newrequest", generateURL);
app.get("/:shorturl", getUrl);

connectDatabase().then(() => {
  app.listen(3000, () => {
    console.log("Server listening at http://localhost:3000");
  });
});
