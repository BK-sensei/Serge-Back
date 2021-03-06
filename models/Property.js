const { Schema, model } = require("mongoose")

const PropertySchema = Schema({
    keyName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    owner:
        { type: Schema.Types.ObjectId, ref: "User" }
    ,
    auction:
        { type: Schema.Types.ObjectId, ref: "Auction" }
    ,
    lines: {
        type: Array,
        required: true
    },
    isHub:  Boolean,
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
    ratio: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    vendingMachines: Number,
    shops: Number,
    shoppingMall: Number,
    monument: Object,
    position: Array,
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    class: String,
    range: Number,
})

const Property = model("Property", PropertySchema)

module.exports = Property