const express = require("express");
const app = express()

const Property = require("../models/Property")

// require middlewares


// Récupérer toutes les propriétés
app.get('/', async (req, res) => {
    const properties = await Property.find()
  
    res.json(properties)
})

// Récupérer une propriété 
app.get('/:id', async (req, res) => {
    const { id } = req.params
  
    const property = await Property.findById( _id)
        .populate('owner', 'username')
        .populate('auction')
        .populate('currentValue')
        .populate('ratio')
        .populate('vendingMachines')
        .populate('shops')
        .populate('shoppingMall')
        .populate('monument')       
  
    res.json(property)
})

// Mettre à jour les données d'une propriété
app.put('/:id', async (req, res) => {
    const { id } = req.params
  
    const property = await Property.findOneAndUpdate(
      { _id: id },
      { $set: { ...req.body } },
      { new: true }
    )
  
    res.json(property)
})


module.exports = app