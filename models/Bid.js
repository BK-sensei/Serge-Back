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
})

BidSchema.post("save", async function(doc) {
    const id = doc._id
    const user = doc.user
    await model("Auction").updateOne(
      { _id: doc.auction },
      { $push: { bids: id, user}}
    )
  })