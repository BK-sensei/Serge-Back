const {Schema, model} = require('mongoose')

const AuctionSchema = Schema({
    property : {type : 
        Schema.Types.ObjectId, ref : "Property"
    },
    card : {type : 
        Schema.Types.ObjectId
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