import 'dotenv/config.js';
import http from 'http';
import mongoose from 'mongoose';
import app from './app.js';



const port = process.env.PORT || 4000;
const server = http.createServer(app);


server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})