const express = require("express");
const app = express()

const Property = require("../models/Property")

// middlewares
const { verifyOwner } = require("../middlewares/properties")


// Récupérer toutes les propriétés
app.get('/', async (req, res) => {
    const properties = await Property.find()
  
    res.json(properties)
})

// Récupérer les 10 meilleures propriétés
app.get('/top10', async (req, res) => {
    const properties = await Property.find().sort({"traffic": "desc"}).limit(10)
  
    res.json(properties)
})

// Récupérer une propriété 
app.get('/:id', async (req, res) => {
    const { id } = req.params
  
    const property = await Property.findOne({ _id : id })
        // .populate('owner', 'username')
        // .populate('auction')
        // .populate('currentValue')
        // .populate('ratio')
        // .populate('vendingMachines')
        // .populate('shops')
        // .populate('shoppingMall')
        // .populate('monument')       
  
    res.json(property)
})

// Mettre à jour les données d'une propriété
app.put('/:id',verifyOwner, async (req, res) => {
    const { id } = req.params
  
    const property = await Property.findOneAndUpdate(
      { _id: id },
      { $set: { ...req.body } },
      { new: true }
    )
  
    res.json(property)
})


// Pour créer une amélioration ou créer la currentValue
app.put('/:id/:upgrade', async (req, res) => {
    const { id, upgrade } = req.params
    const checkProperty = await Property.findById(id)
    const checkVendingMachines = checkProperty.vendingMachines
    const checkShop = checkProperty.shops
    const checkshoppingMall = checkProperty.shoppingMall

    try {
        if ( upgrade ==="vendingmachine"){
            if(checkVendingMachines >=3){
                res.json("fuck u")
            } else {
                const propertyUpgrade = await Property.findOneAndUpdate(
                    { _id: id },
                    { $set: { vendingMachines : vendingMachines + 1 , ratio : ratio + 0.2},
                 },
                    { new: true }
                )
                res.json(propertyUpgrade)
            }
        }

        if ( upgrade === "shops"){
            if (checkShop >=3 ||checkVendingMachines <3 ){
                res.json("not allowed to build")
            } else {
                const propertyUpgradeShop = await Property.findOneAndUpdate(
                    { _id: id },
                    { $set: { shops : shops + 1 , ratio : ratio + 0.4},
                 },
                    { new: true }
                )
                res.json(propertyUpgradeShop) 
            }
        }

        if ( upgrade === "mall") {
            if (checkshoppingMall >= 1 || checkShop <3 ){
                res.json("not allowed to build")
            }else {
                const propertyUpgradeMall = await Property.findOneAndUpdate(
                    {_id:id},
                    {$set : {shoppingMall: shoppingMall +1 , ratio : ratio + 0.6}}
                )
                res.json(propertyUpgradeMall)
            }
        }

    } catch (err){
        console.log(err)
        res.status(500).json({error : err})
    }
  
})


module.exports = app