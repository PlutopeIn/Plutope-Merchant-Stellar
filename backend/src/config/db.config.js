import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

mongoose.connect(process.env.DATABASE).then(() => {
    console.log('Database Connected');
}).catch((err) => {
    console.log('Database not connected', err);
})