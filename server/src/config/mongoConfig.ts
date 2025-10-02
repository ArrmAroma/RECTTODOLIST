import * as path from 'path';
import * as dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config({path: path.join(__dirname,"../../database.env")})

export const connectMongoDB = async() => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log("MongoDB connected");
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
    }
}
