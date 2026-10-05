const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "NEXA_SECRET";

let users = [
  { username: "owner", password: "owner123", role: "owner" }
];

app.get("/", (req,res)=>{
  res.send("API ONLINE 🚀");
});

app.post("/login", (req,res)=>{
  const {username,password} = req.body;

  const user = users.find(u=>u.username===username && u.password===password);
  if(!user) return res.json({msg:"login gagal"});

  const token = jwt.sign(user, SECRET);
  res.json({token});
});

app.post("/register", (req,res)=>{
  const {username,password} = req.body;

  users.push({username,password,role:"free"});
  res.json({msg:"register berhasil"});
});

app.listen(3000);
