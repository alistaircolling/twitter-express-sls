const serverless = require("serverless-http");
const express = require("express");
var cors = require("cors");
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
  res.send({ message: req.body.val });
});

app.listen(3001, () => console.log(`Listening on: 3001`));
//module.exports.handler = serverless(app);
