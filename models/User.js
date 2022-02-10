const { Schema, model } = require('mongoose')
const Property = require("./Property")

const UserSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    pictureUrl: {
        type: String,
    },
    balance: {
        type: Number,
        required: true
    },
    properties: [
        { type: Schema.Types.ObjectId, ref: "Property" }
    ],
    cards: [
        { type: Schema.Types.ObjectId, ref: "Card" }
    ],
    auctions: [
        { type: Schema.Types.ObjectId, ref: "Auction" }
    ],
    position: 
        { type: Schema.Types.ObjectId, ref: "Property" }
    ,
}, {
    timestamps: true
})

// Avant de remove un user, on supprime ses propriétés
UserSchema.pre("deleteOne", async function(next) {
    const { _id } = this.getFilter()

    await Property.deleteMany({ user: _id })
})


const User = model('User', UserSchema)

module.exports = User