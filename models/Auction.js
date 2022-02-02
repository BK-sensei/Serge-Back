const {Schema, model} = require('mongoose')

const AuctionSchema = Schema({
    user : {type : 
        Schema.Types.ObjectId, ref: "User"},
    property : {type : 
        Schema.Types.ObjectId, ref : "Property"
    },
    card : {type : 
        Schema.Types.ObjectId, ref : "Card"
    },   
    bids : [
        {type: Schema.Types.ObjectId, ref :"Bid"}
    ],
    active : Boolean,
    startDate : Date,
    endDate: Date
})


const Auction = mongoose.model('Auction', AuctionSchema)
module.exports = Auction