import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export const Connection = async () => {
    const URL = ''
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected...");
    } catch (error) {
        console.log("Error while  connecting to the database", error);
    }
}