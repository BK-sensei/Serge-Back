const express = require('express')
const app = express()
const moment = require ('moment')
const Auction = require ('../models/Auction')



/// Création d'une Auction 
app.post('/',async(req,res)=>{
    
    const {user, card, property} = req.body

    
    try {
        let present = moment()
        // let future = m
        const auction  = await  Auction.create({
            user : user,
            card: card,
            property: property,
            startDate : present,
            // endDate : 
        })
        res.json(auction)

    } catch(err) {
        res.status(500).json({error :err})
        console.log("error",err)
    }

})

/// Recupere toute les Auctons

app.get('/',async(req,res)=>{
  try {  
    const auctions = await Auction
        .find({})
        .populate({
            path: 'property',
            model : 'Property'
        })
        .populate({
            path :'card',
            model : 'Card'
        })
        .exec()
    res.json(auctions)


    } catch(err) {
        res.status(500).json({error : err})
        console.log("error", err)
    }
})

/// Récupère une auction grâce à son ID

app.get('/:id', async(req,res) => {
    const {id} = req.params
    try {
        const auction = await Auction
        .findByI(id)
        .populate({
            path : 'bids',
            model : 'Bid',
            populate : {
                path : 'user',
                model : 'User'
            }

        })
        res.json(auction)

    } catch(err) {
        res.status(500).json({error : err})
        console.log("error",err)
    }
})


//// Supprime une Auction ////

app.delete('/', async(req,res)=>{
    const {id} = req.body
    try {
        const deletedAuction =  await Auction.findById(id)
        await Auction.deleteOne({_id : id }).exec()

    } catch (err){
        res.status(500).json({error : err})
        console.log("error",err)
    }

})

module.exports= app 