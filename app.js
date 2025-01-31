/*const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const multer = require("./utils/multer");
// const upload = require("./utils/multer");

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(cookieParser());

const userModel = require("./models/user");
const ownerModel = require("./models/owner");
const productModel = require("./models/product");

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
app.get("/admin/create",(req,res)=>{
    res.render("createproducts");
})
app.get("/owner",(req,res)=>{
    res.render("owner-login");
})

app.post("/create", async (req,res)=>{
    let {fullname, email, password} = req.body;

    let user = await userModel.findOne({email});
    if(user)  console.log("already");


    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt, async (err,hash)=>{
            try{
                const user = await userModel.create({
                    fullname,
                    email,
                    password: hash,
                });
                console.log("Created sucessfully");

                let token = jwt.sign({email: email,userid: user._id},"SUVObag");
                res.cookie("token",token);
                res.redirect("/");
            }
            catch{
                console.log(err.message);
            }
        })
    })

   

})

app.listen(3000);
*/













const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

const userModel = require("./models/user");
const ownerModel = require("./models/owner");
const productModel = require("./models/product");

app.get("/", (req, res) => {
    res.render("index", { message: null });
});

app.get("/shop", (req, res) => {
    res.render("shop", { message: null });
});

app.get("/cart", (req, res) => {
    res.render("cart", { message: null });
});

app.get("/admin", (req, res) => {
    res.render("admin", { message: null });
});

app.get("/admin/create", (req, res) => {
    res.render("createproducts", { message: null });
});

app.get("/owner", (req, res) => {
    res.render("owner-login", { message: null });
});

app.post("/create", async (req, res) => {
    let { fullname, email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (user) {
        return res.render("index", { message: "User already exists" });
    }

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            try {
                const user = await userModel.create({
                    fullname,
                    email,
                    password: hash,
                });

                let token = jwt.sign({ email: email, userid: user._id }, "SUVObag");
                res.cookie("token", token);
                res.render("index", { message: "User created successfully" });
            } catch (err) {
                res.render("index", { message: "Error creating user: " + err.message });
            }
        });
    });
});

app.listen(3000);
