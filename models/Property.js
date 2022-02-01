const { Schema, model } = require("mongoose")

const PropertySchema = Schema({
    name: String,
    owner: [
        { type: Schema.Types.ObjectId, ref: "User" }
    ],
    auction: [
        { type: Schema.Types.ObjectId, ref: "Auction" }
    ],
    line: Array,
    isHub: Boolean,
    currentValue: Number,
    tax: Number,
    ratio: Number,
    vendingMachines: Number,
    shops: Number,
    shoppingMall: Number,
    hasMonument: Boolean,
    monument: String,
    initialValue: Number,
    traffic: Number,
    slice: Number,
    index: Object,
    latitude: Float,
    longitude: Float,
})

const Property = model("Property", PropertySchema)
module.exports = Property