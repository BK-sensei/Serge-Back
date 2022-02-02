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
    lines: {
        type: Array,
        required: true
    },
    isHub: {
        type: Boolean,
        required: true
    },
    currentValue: {
        type: Number,
        required: true
    },
    initialValue: {
        type: Number,
        required: true
    },
    traffic: {
        type: Number,
        required: true
    },
    slice: {
        type: Number,
        required: true
    },
    ratio: Number,
    vendingMachines: Number,
    shops: Number,
    shoppingMall: Number,
    hasMonument: Boolean,
    monument: String,
    index: {
        type: Array,
        required: true
    },
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