require('dotenv').config()
const express = require("express")
const app = express()
const port = process.env.PORT
const mongoose = require("mongoose")
const morgan = require("morgan")

console.log("origin",process.env.ALLOWED_DOMAIN);

const passport = require("./config/passport")
const session = require("express-session")

const cors = require("cors")

const { dbConnect } = require ('./config/db')
dbConnect()


const userRoutes = require("./routes/user")
const authRoutes = require("./routes/authentication")
const propertiesRoutes = require("./routes/properties")
const cardsRoutes = require("./routes/cards")
const auctionsRoutes = require ('./routes/auction')
const bidRoutes = require ('./routes/bid')
const linesRoutes = require ('./routes/lines')


app.use(express.json())
app.use(morgan("tiny"))

app.use(cors({
    origin: process.env.ALLOWED_DOMAIN,
    credentials: true
}))


app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())


app.use("/users", userRoutes)
app.use("/auth", authRoutes)
app.use('/auction',auctionsRoutes)
app.use('/bid', bidRoutes)
app.use('/properties', propertiesRoutes)
app.use('/cards', cardsRoutes)
app.use('/lines', linesRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})