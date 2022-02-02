const express = require('express')
const app = express()

const Auction = require ('../models/Auction')

app.post('/',async(req,res)=>{
    
    const {user, card, property} = req.params
    
    const auction  = await Auction.create({

        user : user,
        card: card,
        property: property,


        
    })


})

app.get('/',async(req,res)=>{
  try {  
    const auctions = await Auction
        .find({})
        .populate({
            path: 'properties',
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

app.delete('/', async(req,res)=>{
    const {id} = req.params
    try {
        const deletedAuction =  await Auction.findById(id)
        await Auction.deleteOne({_id : id }).exec()

    } catch (err){
        res.status(500).json({error : err})
        console.log("error",err)
    }

})