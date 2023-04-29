const shortURL = require("../db/rpstinyurl.model");
const { nanoid } = require("nanoid");

async function generateURL(req, res) {
  try {
    const { shortId = "", redirectId } = req.body;

    if (redirectId == undefined) {
      res.status(400).send({ error: "url is required" });
    }

    if (shortId == "") {
      const newShortId = nanoid(7);
      const id = await shortURL.create({
        shortId: newShortId,
        redirectId: redirectId,
        visitHistory: [],
      });

      res.send(id);
    } else {
      const id = await shortURL.findOne({ shortId });
      if (id) {
        res.status(409).send({ error: "short url already exist" });
      } else {
        const id = await shortURL.create({
          shortId: shortId,
          redirectId: redirectId,
          visitHistory: [],
        });

        res.send(id);
      }
    }
  } catch (error) {
    res.status(500).send({ error: "Something went wrong" });
  }
}

async function getUrl(req, res) {
  const shortId = req.params.shorturl;

  const id = await shortURL.findOne({ shortId });

  if (id) {
    const entry = await shortURL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: new Date() } }
    );

    res.redirect(entry.redirectId);
  } else {
    res.status(404).send({ error: "url not found" });
  }
}

module.exports = { generateURL, getUrl };
