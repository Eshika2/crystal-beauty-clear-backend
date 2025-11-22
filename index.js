import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import { verifyJWT } from './middleware/auth.js';
import orderRouter from './routers/orderRouter.js';

let app = express();
dotenv.config();


mongoose.connect(process.env.MONGO_URL).then(
    ()=>{
        console.log("Connected to the database");
    }
).catch(
    ()=>{
        console.log("Connection failed");
    }
)

//middleware
app.use(bodyParser.json());
app.use(verifyJWT);



app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/order", orderRouter)


app.listen(process.env.PORT, ()=> {
    console.log("Server is running.");
})