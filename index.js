const express = require("express");
const fs = require("fs");
const pino = require("pino-http")();

const app = express();

let contactData = fs.readFileSync("./contact.json", "utf-8");

app.use(pino);
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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

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
  res.send(JSON.parse(contactData));
  console.log(JSON.parse(contactData));
});

app.post("/contact", (req, res) => {
  console.log(req.body);
  let newContact = {
    id: JSON.parse(contactData).length + 1,
    name: req.body.name,
    email: req.body.email,
  };
  fs.writeFileSync(
    "./contact.json",
    JSON.stringify([...JSON.parse(contactData), newContact])
  );
  res.send(JSON.parse(contactData));
});

app.put("/contact/:id", (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  contactData = JSON.parse(contactData);
  const index = contactData.findIndex((a) => a.id == id);
  console.log(contactData);
  console.log(id);
  if (index !== -1) {
    contactData[index].name = req.body.name || contactData[index].name;
    contactData[index].email = req.body.email || contactData[index].email;

    fs.writeFileSync("./contact.json", JSON.stringify(contactData));

    res.send(contactData);
  } else {
    res.status(404).send({ message: "Contact not found" });
  }
});

// app.put("/admin/:id", (req, res) => {
//   console.log(req.body);
//   let id = req.params.id;
//   let singleAdmin = admin.filter((admin) => admin.id == id);
//   if (!singleAdmin) return res.status(404).send("Admin not found");
//   for (let i = 0; i < req.body.length; i++) {
//     singleAdmin[0][i] = req.body[i];
//   }
//   admin = singleAdmin;
//   res.send(admin);
// });

app.put("/admin/:id", (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  const index = admin.findIndex((a) => a.id === parseInt(id));
  console.log(index);

  if (index !== -1) {
    admin[index].name = req.body.name || admin[index].name;
    admin[index].password = req.body.password || admin[index].password;
    admin[index].username = req.body.username || admin[index].username;
    res.send(admin[index]);
  } else {
    res.status(404).send({ message: "Admin not found" });
  }
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

// TODO : Read from json and write to json

// TODO : Add logger library DONE .. Using Pino
