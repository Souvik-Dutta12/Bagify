const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Bagify");

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    cart: {
        type: Array,
        default: [],
    },
    isadmin: {
        type: Boolean,
        default: false 
    },
    referalCode:{
        type: String,
        default: 0
    },
    orders: {
        type: Array,
        default: [],
    }
});

module.exports = mongoose.model("user",userSchema);