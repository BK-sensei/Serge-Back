const express = require("express")
const app = express()

const User = require("../models/User")
const Property = require ("../models/Property")

// Afficher tous les joueurs
app.get('/', async (req, res) => {
    try {
        const users = await User.find()
        .populate({
            path : 'user',
            model : 'User'
        })
        .exec()

        res.json(users)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error : err })
    }
})

// Afficher les 10 meilleures joueurs
app.get('/top10', async (req, res) => {
    const users = await User.find().sort({"balance": "desc"}).limit(10)
  
    res.json(users)
})

// Afficher un joueur selon son id
app.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findById(id)
        .populate({
            path : 'properties',
            model : 'Property'
        })
        .populate({
            path : 'position',
            model :'Property'
        })
        .exec()

        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error : err })
    }
})

// Modifier les informations d'un joueur
app.put('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true }
        ).exec()

    res.json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error : err })
    }
})

// Supprimer un joueur
app.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        await User.deleteOne({ _id: id })

        res.json({ sucess: 'User successfully deleted'})
    } catch (err) {
        console.log(err)
        res.status(500).json({ error : err })
    }
})

/// achat proprieté 

app.put('/:id/:property',async(req,res)=>{
    const {id , property } = req.params

    try{
        const stationCheck = await Property.findById(property)
        console.log("currentvalue", stationCheck)
        const price = stationCheck.currentValue
        console.log('price', price)
        const userCheck = await User.findById(id)
        const userCheckBalance = userCheck.balance - price
        console.log('userCheckBalance',userCheckBalance)
    
        const userBuy =  await User.findOneAndUpdate(
            {_id : id},
            {$push: {properties : property}},
            {$set : {balance : 1000}},
            {new :true}
        ).exec()
    const stationSell = await Property.findOneAndUpdate(
        {_id : property},
        {$set : {user : id}},
        {new : true}
    ).exec()
    }catch (err){
        console.log(err)
        res.status(500).json({error : err})
    }
})

module.exports = app