const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const multer = require("./utils/multer");
// const upload = require("./utils/multer");

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

app.post("/login", async (req,res)=>{
    let {emaillog, passlog} = req.body;

    let user = await userModel.findOne({email: emaillog});
    if(!user)    return res.render("index",{message: "Something Went Wrong"});

    bcrypt.compare(passlog,user.password,(err,result)=>{
        if(result){
            let token = jwt.sign({email: emaillog,userid: user._id},"SUVObag");
            res.cookie("token",token);
            res.redirect("/shop");
         }  
         else{
            res.render("index",{message: "Something Went Wrong"});
        }    
    })
})




// function isLoggedIn(req,res,next){
//     if(req.cookies.token == "") res.redirect("/");
//     else{
//         let data = jwt.verify(req.cookies.token,"SUVObag");
//         req.user = data;
//         next();
//     }
// }
app.listen(3000);
