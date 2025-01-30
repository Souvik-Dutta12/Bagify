const express = require("express");
const app = express();
const path = require("path");
// const userModel = require("./models/user");
// const postModel = require("./models/post");
const cookieParser = require("cookie-parser");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const multer = require("./utils/multer");
// const upload = require("./utils/multer");

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/shop",(req,res)=>{
    res.render("shop");
})
app.get("/cart",(req,res)=>{
    res.render("cart");
})
app.get("/admin",(req,res)=>{
    res.render("admin");
})
app.listen(3000);