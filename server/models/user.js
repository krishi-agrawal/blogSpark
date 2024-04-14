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

// userSchema.methods.generateAuthToken = function () {
// 	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
// 		expiresIn: "7d",
// 	});
// 	return token;
// };
const User = mongoose.model("user", userSchema)
export default User