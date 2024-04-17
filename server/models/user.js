import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    }
})

const User = mongoose.model("user", userSchema)
export default User