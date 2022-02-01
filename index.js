require('dotenv').config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const session = require("express-session")
const app = express()
const port = 5000

console.log(process.env.DB_URL)


const { dbConnect }  = require ('./dbConfig/db')

dbConnect()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))


app.use(express.json())
app.use(morgan("tiny"))

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: false
}))

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})