const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const port = 5000

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