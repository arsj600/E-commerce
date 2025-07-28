import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import cors from 'cors'

import connectDB from './config/Mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// App Config





await connectCloudinary()
const app =express();
const port =process.env.Port ||4000;
connectDB()
app.use(express.json());
app.use(cors());



// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/' ,(req,res)=>{
    res.send("API is Working")
})

app.listen(port,()=>{
    console.log("server started on :"+port)
}) 