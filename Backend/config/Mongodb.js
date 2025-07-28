import mongoose from "mongoose";
// import 'dotenv/config';

const connectDB= async () =>{
    mongoose.connection.on('connected',()=>{
        console.log("DB Connected")
    })
    await mongoose.connect(`${process.env.MONGODB_URL}/ecommerce`)

}
console.log("process.env.MONGODB_URL");

export default connectDB;