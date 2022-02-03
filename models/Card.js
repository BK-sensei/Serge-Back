const { Schema, model } = require("mongoose")

const CardSchema = Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    amount: Number,
    owner: [
        { type: Schema.Types.ObjectId, ref: "User" }
    ],
    auction: [
        { type: Schema.Types.ObjectId, ref: "Auction" }
    ],
    used: Boolean,
})

const Card = model("Card", CardSchema)

module.exports = Card