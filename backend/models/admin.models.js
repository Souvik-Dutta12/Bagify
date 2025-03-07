import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password:{
            type: String,
            required: true,
        },
        role:{
            type: String,
            required: true,
            default: 'admin'
        },
        referalCode:{
            type: String,
            required: true,
            unique: true,
        },
    },
    {timestamps: true});

export const Admin = mongoose.model('Admin', adminSchema);