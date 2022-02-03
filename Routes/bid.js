const express = require('express')
const app = express()

const moment = require ('moment')


const Bid = require ('../models/Bid')
const Auction = require ('../models/Auction')

app.post('/', async (req,res)=>{
    const {user,auction} = req.body

    try {
        const auctionCheck = await Auction.findById(auction)
        const auctionEndTime = auctionCheck.endDate
        const checkTIme = moment().isAfter(auctionEndTime)
        
        if(checkTIme){
            const auctionUpdate = await Auction.findOneAndUpdate(
                { _id: auctionCheck._id },
                { $set: { active : false } },
                { new: true }
            )
            res.json(auctionUpdate)
        }
        else{
            const newBid = await Bid.create({
                auction: auctionCheck._id
            })
            res.json(newBid)
        }
    } catch (err){
      console.log(err)
      res.status(500).json({error : err})
    }   
})

module.exports = app