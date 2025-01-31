const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Bagify");

const ownerSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    products:  {
        type: Array,
        default: [],
    },
    referalCode:{
        type: String,
        default: "Souvik@5122005",
    },
    isadmin:{
        type: Boolean,
        default:true
    }
});

