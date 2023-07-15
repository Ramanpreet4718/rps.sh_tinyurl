const shortURL = require("../db/rpstinyurl.model");
const { nanoid } = require("nanoid");
const utils = require("../utils/utils");
const ObjectId = require('mongodb').ObjectId

async function generateURL(req, res) {
  try {
    const { tinyUrl = "", redirectUrl, userId = "" } = req.body.data;
    let auther = {};

    console.log(userId);

    if (utils.IS_EMPTY(userId) == false) {
      let object = await utils.GET_USER_BY_ID(userId);

      console.log(object);
      if (object) {
        auther.name = object.name;
        auther._id = object._id;
        auther.email = object.email;
      }

      console.log(auther);
    }

    if (redirectUrl == "") {
      res.status(400).send({ statusCode: 400, error: "url is required" });
    }

    if (tinyUrl == "") {
      const newtinyUrl = nanoid(7);
      const id = await shortURL.create({
        tinyUrl: newtinyUrl,
        redirectUrl: redirectUrl,
        auther: Object.keys(auther).length > 0 ? auther : { email: "anonymous" },
        visitHistory: [],
      });

      res.send(id);
    } else {
      const id = await shortURL.findOne({ tinyUrl });
      if (id) {
        res.status(409).send({ statusCode: 409, error: "short url already exist" });
      } else {
        const id = await shortURL.create({
          tinyUrl: tinyUrl,
          redirectUrl: redirectUrl,
          auther: Object.keys(auther).length > 0 ? auther : { email: "anonymous" },
          visitHistory: [],
        });

        res.send(id);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ statusCode: 500, error: "Something went wrong" });
  }
}

async function getUrl(req, res) {
  const tinyUrl = req.params.shorturl;

  const id = await shortURL.findOne({ tinyUrl });

  if (id) {
    const entry = await shortURL.findOneAndUpdate(
      { tinyUrl },
      { $push: { visitHistory: new Date() } }
    );

    res.send(entry.redirectUrl);
  } else {
    res.status(404).send({ statusCode: 404, error: "url not found" });
  }
}

async function getUserHistory(req, res) {
  try {
    const { userId } = req.body.data;
    const objectId = new ObjectId(userId)
    let userHistory = await shortURL.find({ "auther._id": objectId });
    res.send({ statusCode: 200, list: userHistory });

  } catch (error) {
    console.log(error);
    res.status(500).send({ statusCode: 500, error: "Something went wrong" });
  }
}

module.exports = { generateURL, getUrl, getUserHistory };
