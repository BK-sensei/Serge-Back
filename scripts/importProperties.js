// Se connecter à la base de données
require("dotenv").config()
const mongoose = require("mongoose")

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection

db.on("error", err => console.log(err))
db.once("open", () => console.log("connect to db"))


// Récupérer le json des stations
const stations = require("../json/stations.json")
console.log(stations.freq.KLEBER)


// Récupérer les infos de l'api ratp
const stationsWithTraffic = require("../json/traffic.json")
console.log(stationsWithTraffic.records[0])


// Mixer les deux jeux de données pour avoir 
// les propriétés avec les bonnes informations
const stationNames = Object.keys(stations.freq)

const properties = stationNames.map(stationName => {
    const oldStation = stations.freq[stationName]
    // const stationWithTraffic = stationsWithTraffic.records.find(s => s.station === stationName)

    return {
        name: oldStation.name,
        latitude: oldStation.latitude,
        longitude: oldStation.longitude,
        //traffic: stationWithTraffic.fields.trafic
    }
})


// Insérer en db les propriétés avec les bonnes informations
const Property = require("../models/Property")

const insertProperties = async () => {
    // await Property.deleteMany({})
    const insertedProperties = await Property.insertMany(properties)
}

insertProperties()