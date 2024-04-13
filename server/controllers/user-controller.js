import bcrypt from "bcrypt"
import User from "../models/user.js"

export const signupUser = async (request, response) => {
    try {
        const hashPassword = await bcrypt.hash(request.body.password, 10);

        const user = {username: request.body.username, password: hashPassword}
        const newUser = new User(user)
        await newUser.save()
        return response.status(200).json({msg: "signup successful"})
    } catch (error) {
        return response.status(500).json({msg: "problem w signing up"})
        
    }
}