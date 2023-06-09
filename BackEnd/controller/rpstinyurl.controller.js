const shortURL = require("../db/rpstinyurl.model");
const { nanoid } = require("nanoid");

async function generateURL(req, res) {
  try {
    console.log(req.body);
    const { tinyUrl = "", redirectUrl } = req.body.data;

    if (redirectUrl == "") {
      res.status(400).send({statusCode:400, error: "url is required" });
    }

    if (tinyUrl == "") {
      const newtinyUrl = nanoid(7);
      const id = await shortURL.create({
        tinyUrl: newtinyUrl,
        redirectUrl: redirectUrl,
        visitHistory: [],
      });

      res.send(id);
    } else {
      const id = await shortURL.findOne({ tinyUrl });
      if (id) {
        res.status(409).send({ statusCode:409, error: "short url already exist" });
      } else {
        const id = await shortURL.create({
          tinyUrl: tinyUrl,
          redirectUrl: redirectUrl,
          visitHistory: [],
        });

        res.send(id);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({statusCode:500, error: "Something went wrong" });
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
    res.status(404).send({statusCode:404, error: "url not found" });
  }
}

module.exports = { generateURL, getUrl };
