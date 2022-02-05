const express = require("express");
const app = express()

const Card = require("../models/Card")


// Récupérer toutes les cartes chance
app.get('/', async (req, res) => {
    const cards = await Card.find()
  
    res.json(cards)
})

// Récupérer une seule carte chance
app.get('/:id', async (req, res) => {
    const { id } = req.params
  
    const card = await Card.findOne({ _id : id })
        // .populate('owner', 'username')
        // .populate('used')
        // .populate('auction')
       
    res.json(card)
})

// Mettre à jour les infos de la carte (owner, used, auction)
app.put('/:id', async (req, res) => {
    const { id } = req.params
  
    const card = await Card.findOneAndUpdate(
        { _id: id },
        { $set: { ...req.body } },
        { new: true }
    )
    
    res.json(card)
})

module.exports = app