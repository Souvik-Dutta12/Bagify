const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

router.get("/",(req,res)=>{
    res.send("hey its working");
})

router.get("/",(req,res)=>{
    res.render("/index");
});
router.post("/register", (req,res)=>{
    try{
        let {email,password,fullname} = req.body;

        bcrypt.gensalt(10,(err,salt)=>{
            bcrypt.hash(password,salt, async (err,hash)=>{
                if(err) return res.send(err.message);
                else{
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname
                    });

                    let token = jwt.sign({email, id: user_id},"Souvik");
                    res.coookie("token",token);
                    res.send("User Created Successfully");
                }
            })
        });
    }catch(err){
        res.send(err.message);
    }
});


module.exports = router;