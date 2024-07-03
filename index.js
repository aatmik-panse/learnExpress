const express = require("express");
const fs = require("fs");

const file = fs.readFileSync("./contact.json");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/about", (req, res) => {
  res.send("About Page");
});

app.get("/contact", (req, res) => {
  res.send(JSON.parse(file));
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
