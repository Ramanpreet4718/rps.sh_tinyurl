const express = require("express");
const connectDatabase = require("./db/connectDatabase");
const morgan = require("morgan");
const urlGeneration = require("./Routes/urlGenrtaion.route");

const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(urlGeneration);

connectDatabase().then(() => {
  app.listen(3000, () => {
    console.log("Server listening at http://localhost:3000");
  });
});
