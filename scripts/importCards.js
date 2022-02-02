// Se connecter à la base de données
require("dotenv").config()
const mongoose = require("mongoose")

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection

db.on("error", err => console.log(err))
db.once("open", () => console.log("connect to db"))


// Récupérer le json 
const cards = require("../json/cardsChance.json")

// Insérer dans db 
const Card = require("../models/Card")

const insertCards = async () => {
    await Card.deleteMany({})
    const insertedCards = await Card.insertMany(cards)
    console.log(insertedCards);
}

insertCards()