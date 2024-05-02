import express from "express"
import { Connection } from "./database/db.js"
import Router from "./routes/route.js"
import cors from 'cors'
import bodyParser from "body-parser"
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT || 8000

const app = express()

app.use(cors({
    origin: "https://blogspark-frontend.vercel.app",
    methods: ['POST', 'GET',  'PUT', 'DELETE'],
    credentials: true
}))
app.use(function (req, res, next) {
    //Enabling CORS
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization")
      next();
    });
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/", Router)

// if(process.env.NODE_ENV === 'prodcution'){
//     app.use(express.static("client/build"))
// }

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}...`) })
Connection()