const express = require('express')
const app = express()

const Bid = require ('../models/Bid')

app.post('/', async (req,res)=>{
    // const {user} = req.body
    console.log("test")
    try {
      const bid = new Bid ({... req.body})
      const bidInsered = await bid.save()
      res.json(bidInsered)
      console.log("bid",bidInsered)
    } catch (err){
      console.log(err)
      res.status(500).json({error : err})
    }
    
   
})



module.exports = app