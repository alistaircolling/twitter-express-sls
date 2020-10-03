const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const Twit = require("twit");
let config = {
  consumer_key: "hBMv81DL5k3kWAskc5H6jg",
  consumer_secret: "MnQiXLobTXTSejYeScJPhM8e4uJy1Bg8mzgnw30BMA",
  access_token: "16739856-IO5HvFzMRGNSrmNT0Nxp5GbXJvhQeZGVeT1XEqxIi",
  access_token_secret: "rb2nYI6igVKAWX8yECndATiom1asRJKgQDt7MbBxggD72",
};
const Twitter = new Twit(config);
const app = express();

app.use(express.raw());
app.use(express.urlencoded({ extended: true }));
app.use(express.json("application/string"));
app.use(cors());

app.get("/api/info", (req, res) => {
  res.send({ application: "sample-app", version: "1" });
});

app.post("/api/v1/getback", (req, res) => {
  console.log("request to API");
  console.log(req.body);
  //res.send("asdfasdfads");
  Twitter.get("statuses/user_timeline", { screen_name: "alidrongo" }, function (
    err,
    data,
    response
  ) {
    res.send({ tweets: data });
  });
});
//app.listen(3001, () => console.log(`Listening on: 3001`));
module.exports.handler = serverless(app);
