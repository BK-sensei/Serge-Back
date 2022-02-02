const express = require("express");
const app = express()

const Card = require("../models/Card")

// require middlewares


// Récupérer toutes les cartes chance
app.get('/', async (req, res) => {
    const cards = await Card.find()
  
    res.json(cards)
})

// Récupérer une seule carte chance
app.get('/:id', async (req, res) => {
    const { id } = req.params
  
    const card = await Card.findById( _id)
        .populate('owner', 'username')
        .populate('used')
        .populate('auction')
       
    res.json(card)
})

// Mettre à jour le "used" de la carte