const express = require("express");
const cors = require("cors");
const connectDatabase = require("./db/connectDatabase");
const morgan = require("morgan");
const urlGeneration = require("./Routes/urlGenrtaion.route");
const userAuth = require("./Routes/Authenticaion.route");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(urlGeneration);
app.use(userAuth);

connectDatabase().then(() => {
  app.listen(3000, () => {
    console.log("Server listening at http://localhost:3000");
  });
});
