const express = require("express");
const app = express();

const port = 3000;

const { User } = require("./models");

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.use(express.json());


//post user
app.post("/users", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  }).then((user) => {
    res.send("User berhasil dibuat");
  });
});

app.get("/users/create", (req, res) => {
  res.render("users/create");
});

// show all user
app.get("/users", (req, res) => {
  User.findAll().then((users) => {
    res.render("users/index", {
      users,
    });
  });
});

// show user by id
app.get("/users/:id", (req, res) => {
  User.findOne({
    where: { id: req.params.id },
  }).then((user) => {
    res.render("users/show", {
      user,
    });
  });
});

//update user
app.get("/users/update/:id", (req, res) => {
  User.findOne({ where: { id: req.params.id } }).then((user) => {
    res.render("users/update", { user });
  });
});

app.post("/users/update/:id", (req, res) => {
  User.update(
    {
      username: req.body.username,
      password: req.body.password,
    },
    { where: { id: req.params.id } }
  ).then(() => {
    res.send("User berhasil di update");
  });
});

//delete user
app.get("/users/delete/:id", (req, res) => {
  User.destroy({ where: { id: req.params.id } }).then(() => {
    res.send("user berhasil dihapus");
  });
});

//app.listen(3000);

app.listen(port, () => {
  console.log(`Server is running in http://localhost:${port}`);
});
