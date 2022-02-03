const express = require('express')
const app = express()

const moment = require ('moment')


const Bid = require ('../models/Bid')
const Auction = require ('../models/Auction')

app.post('/', async (req,res)=>{
    const {user,auction} = req.body
    try {
        let present = moment()
            console.log("pleasework",present)
        const auctionCheck = await Auction.findById(auction)
        const auctionEndTime = auctionCheck.endDate
        // if (present >= auctionCheck.endDate){
        //     const auctionClose = await Auction.findOneAndUpdate(
            
        //         {_id :id},
        //         {active : false},
        //         {new: true}
            
        // ). exec()

        // }

        const bid = new Bid ({... req.body})
        const bidInsered = await bid.save()
        res.json(bidInsered)
    } catch (err){
      console.log(err)
      res.status(500).json({error : err})
    }   
})

module.exports = app