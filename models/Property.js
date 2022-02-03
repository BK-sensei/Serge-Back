const { Schema, model } = require("mongoose")

const PropertySchema = Schema({
    name: {
        type: String,
        required: true
    },
    owner: [
        { type: Schema.Types.ObjectId, ref: "User" }
    ],
    auction: [
        { type: Schema.Types.ObjectId, ref: "Auction" }
    ],
    lines: Array,
    isHub:  Boolean,
    currentValue: Number,
    initialValue: Number,
    traffic: Number,
    ratio: Number,
    vendingMachines: Number,
    shops: Number,
    shoppingMall: Number,
    hasMonument: Boolean,
    monument: String,
    index: Array,
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
})

const Property = model("Property", PropertySchema)

module.exports = Property