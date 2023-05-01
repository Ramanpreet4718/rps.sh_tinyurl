const shortURL = require("../db/rpstinyurl.model");
const { nanoid } = require("nanoid");

async function generateURL(req, res) {
  try {
    const { tinyUrl = "", redirectUrl } = req.body.data;
    console.log(req.body.data);

    if (redirectUrl == "") {
      res.status(400).send({ error: "url is required" });
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
        res.status(409).send({ error: "short url already exist" });
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
    res.status(500).send({ error: "Something went wrong" });
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
    res.status(404).send({ error: "url not found" });
  }
}

module.exports = { generateURL, getUrl };
