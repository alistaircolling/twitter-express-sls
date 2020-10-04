require("dotenv").config();
const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const Twit = require("twit");
const { prototype } = require("twit");
const config = {
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
};
const Twitter = new Twit(config);
const app = express();

app.use(express.raw());
app.use(express.urlencoded({ extended: true }));
app.use(express.json("application/string"));
app.use(cors());

app.post("/api/v1/getUserTimeline", (req, res) => {
  Twitter.get(
    "statuses/user_timeline",
    { screen_name: req.body.screen_name },
    function (err, data, response) {
      res.send({ tweets: data });
    }
  );
});
module.exports.handler = serverless(app);
