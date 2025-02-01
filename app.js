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
// const ownerModel = require("./models/owner");
const productModel = require("./models/product");
const user = require("./models/user");
// const product = require("./models/product");


const owner = {
    fullname: "Souvik Duta",
    email: "souvikdutta52005@gmail.com",
    password: "Souvik@D2005",
    referalcode: "Souvik@5122005",
    isadmin: true
}

app.get("/", async (req, res) => {
    res.render("index", { message: null });
});

app.get("/shop", async (req, res) => {
    let products = await productModel.find();
    res.render("shop", {products})
});

app.get("/cart", (req, res) => {
    res.render("cart", { message: null });
});

app.get("/admin", async (req, res) => {
    let products = await productModel.find();
    res.render("admin", {products});
});

app.get("/owner", (req, res) => {
    res.render("owner-login", { message: null });
});

app.get("/create",(req,res)=>{
    res.render("createproducts",{message:null});
})

app.get("/discount", async (req,res)=>{
    let products = await productModel.find();
    res.render("discount",{products})
})

app.get("/delete/:id", async (req,res)=>{
    await productModel.findOneAndDelete({_id:req.params.id});
    res.redirect("/admin");
})

app.get("/edit/:id", async (req,res)=>{
    let product = await productModel.findOne({_id:req.params.id});
    res.render("edit",{product});
})

app.get("/order/:id", async (req,res)=>{
    let product = await productModel.findOne({_id:req.params.id});
    res.render("order",{product});
})


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
        if(result && referalcode === 0 && isadmin === 'false'){
            let token = jwt.sign({email: emaillog,userid: user._id},"SUVObag");
            res.cookie("token",token);
            res.redirect("/shop");
         }  
         else{
            res.render("index",{message: "Something Went Wrong"});
        }    
    })
})

app.post("/ownerlogin",(req,res)=>{
    let{email,password,referal} = req.body;
    if(!owner)  return res.render("index",{message: "Something Went Wrong"});
    
    if(password === owner.password && referal === owner.referalcode && owner.isadmin === true && email === owner.email){
        let token = jwt.sign({email},"SUVObag");
        res.cookie("token",token);
        res.redirect("/admin");
    }
    else{
        res.render("index",{message: "Something Went Wrong"})
    }
})

app.post("/createpro", async (req,res)=>{
    let {image,name,price,discount,bgcolor,pannelcolor,textcolor} = req.body;
    const product = await productModel.create({
        image,
        name,
        price,
        discount,
        bgcolor,
        pannelcolor,
        textcolor
    });
    res.redirect("/admin");
})

app.post("/editted/:id", async (req,res)=>{
    let {image,name,price,discount,bgcolor,pannelcolor,textcolor} = req.body;

    let product = await productModel.findOneAndUpdate({_id:req.params.id},{image,name,price,discount,bgcolor,pannelcolor,textcolor});
    res.redirect("/admin");

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
