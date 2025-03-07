import express from "express";
import cors from "cors";
import connect from "./db/db.js";
import cookieParser from "cookie-parser";

connect();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

app.get("/", (req, res)=>{
    res.send("hello world");
});


export default app;