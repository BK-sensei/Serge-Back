require('dotenv').config()
const express = require("express")
const app = express()
const port = process.env.PORT
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")

app.use(cors({
    origin: process.env.ALLOWED_DOMAIN,
    credentials: true
}))

const passport = require("./config/passport")
const session = require("express-session")

const { dbConnect } = require ('./config/db')

const userRoutes = require("./routes/user")
const authRoutes = require("./routes/authentication")

dbConnect()

app.use(express.json())
app.use(morgan("tiny"))

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use("/users", userRoutes)
app.use("/auth", authRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})