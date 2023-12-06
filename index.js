const express = require("express");
const app = express();
const path = require("path");
const bodyP = require("body-parser");
const Sequelize = require("sequelize");
const db = require("./models")

const sequelize = new Sequelize("comunity", "admin", "010991", {
  host: "localhost",
  dialect: "mysql",
});

const User = db.User;


app.use(express.static(path.join(__dirname, "front")));
app.use(bodyP.json());

app.post("/register", async (req, res) => {
  const newUser = await User.create(req.body);
  
  return res.json(newUser);
});

app.post("/user_destroy", async (req, res)=>{
  const { id } = req.body
  const user = await User.findByPk(id)
  await user.destroy()

  const users = await User.findAll(); 

  return res.json(users)
})

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "front/public/index.html"))
);

app.get("/users", async (req, res) => {
  const users = await User.findAll();

  res.json(users);
});

//resitro de datos

app.post("/registrar", (req, res) => {});

app.listen(8080);
