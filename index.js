const express = require("express");
const fs = require("fs");

const file = fs.readFileSync("./contact.json");

const app = express();

app.use(express.json());

let admin = [
  {
    id: 1,
    name: "admin",
    password: "admin",
    username: "admin",
  },
  {
    id: 2,
    name: "user",
    password: "user",
    username: "user",
  },
  {
    id: 3,
    name: "user1",
    password: "user1",
    username: "user1",
  },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/about", (req, res) => {
  res.send("About Page");
});
app.get("/admin", (req, res) => {
  res.send(admin);
});
app.get("/contact", (req, res) => {
  res.send(JSON.parse(file));
  console.log(JSON.parse(file));
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.post("/contact", (req, res) => {
  res.send("Contact Page");
  console.log(req.body);
});

app.put("/contact", (req, res) => {
  res.send("Contact Page");
  console.log(req.body);
});

app.put("/admin", (req, res) => {
  console.log(req.body);
  let singleAdmin = {
    id: req.body.id,
    name: req.body.name,
    password: req.body.password,
    username: req.body.username,
  };
  let index = admin.findIndex((admin) => admin.id == req.body.id);
  admin[index] = singleAdmin;
  res.send(admin);
});

app.post("/admin", (req, res) => {
  console.log(req.body);
  let singleAdmin = {
    id: admin.length + 1,
    name: req.body.name,
    password: req.body.password,
    username: req.body.username,
  };
  admin.push(singleAdmin);
  res.send(admin);
});

app.delete("/admin/:id", (req, res) => {
  let id = req.params.id;
  let singleAdmin = admin.filter((admin) => admin.id != id);
  admin = singleAdmin;
  res.send(admin);
});
