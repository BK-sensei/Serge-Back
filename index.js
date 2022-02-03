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
dbConnect()

const propertiesRoutes = require("./routes/properties")
const cardsRoutes = require("./routes/cards")
const auctionsRoutes = require ('./Routes/Auction')
const bidRoutes = require ('./Routes/bid')
const userRoutes = require("./routes/user")
const authRoutes = require("./routes/authentication")

app.use(express.json())

app.use(cors({
    origin: process.env.ALLOWED_DOMAIN,
    credentials: true
}))

dbConnect()

app.use(express.json())
app.use(morgan("tiny"))

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: false
}))

app.use('/auction',auctionsRoutes)
app.use('/bid', bidRoutes)
app.use('/properties', propertiesRoutes)
app.use('/cards', cardsRoutes)
app.use("/users", userRoutes)
app.use("/auth", authRoutes)

app.use(passport.initialize())
app.use(passport.session())

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})