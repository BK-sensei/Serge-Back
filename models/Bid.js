const {Schema, model} = require ('mongoose')

const BidSchema = Schema({
    auction : {
        type: Schema.Types.ObjectId, ref : "Auction"
    },

    user : {
        type : Schema.Types.ObjectId, ref : "User"
    },

},{
    timestamps: true
    }
)