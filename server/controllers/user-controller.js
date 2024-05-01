import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import User from "../models/user.js"
import Token from "../models/token.js"

dotenv.config()

export const signupUser = async (request, response) => {
    try {
        const user = { name: request.body.name, username: request.body.username, password: request.body.password }
        const newUser = new User(user)
        await newUser.save()
        return response.status(200).json({ msg: "signup successful" })
    } catch (error) {
        return response.status(500).json({ msg: "problem w signing up" })
    }
}

export const loginUser = async (request, response) => {
    try {
        let user = await User.findOne({ username: request.body.username })
        if (!user) {
            return response.status(400).json({ msg: "Username does not match" })
        } else {
            if (user.username === request.body.username && user.password === request.body.password) {
                const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: "15m" })
                const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY)
                const newToken = new Token({ token: refreshToken })
                await newToken.save()
                return response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username })
            } else {
                return response.status(400).json({ msg: "Please fill all the details correctly" })
            }
        }
    } catch (error) {
        return response.status(500).json({ msg: "problem w logging in" })

    }
}