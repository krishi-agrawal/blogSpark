import express from "express"
import { Connection } from "./database/db.js"
import Router from "./routes/route.js"
import cors from 'cors'
import bodyParser from "body-parser"

const PORT = 8000

const app = express()

app.use(cors())
app.use(bodyParser.json({extended: true})) 
app.use(bodyParser.urlencoded({extended: false})) 

app.use("/", Router)



app.listen(PORT, () => {console.log(`Server is running on port ${PORT}...`)})
Connection()