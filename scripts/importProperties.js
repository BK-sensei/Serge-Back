// Se connecter à la base de données
require("dotenv").config()
const mongoose = require("mongoose")

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection

db.on("error", err => console.log(err))
db.once("open", () => console.log("connect to db"))


// Récupérer le json des stations
const stations = require("../json/stations.json")
    //console.log(stations.freq.KLEBER)


// Récupérer les infos de l'api ratp
const stationsWithTraffic = require("../json/traffic.json")
    //console.log(stationsWithTraffic.records[0])

stationsWithTraffic.records.forEach(element => {
    element.fields.station = element.fields.station.replace(/-/g, ' ').replace("'", ' ')
});


// Mixer les deux jeux de données pour avoir 
// les propriétés avec les bonnes informations
const stationNames = Object.keys(stations.freq)

const properties = stationNames.map(stationName => {
    const oldStation = stations.freq[stationName]  
    const stationWithTraffic = stationsWithTraffic.records.find(s => s.fields.station === stationName)     
    // console.log(stationWithTraffic.fields.trafic)

    const traffic = stationWithTraffic.fields.trafic
    let initialValue = 0

    if (traffic < 1000000) {
        initialValue = 500
    } 
    if (1000000 < traffic && traffic < 2000000) {
        initialValue = 1000 
    }  
    if  (2000000 < traffic && traffic < 5000000) {
        initialValue = 1500
    }  
    if  (5000000 < traffic && traffic < 8000000) {
        initialValue = 2500 
    }  
    if  (8000000 < traffic && traffic < 10000000) {
        initialValue = 5000 
    }  
    if  (10000000 < traffic && traffic < 30000000) {
        initialValue = 8000 
    }  
    if (130000000 < traffic) {
        initialValue = 10000  
    }

    return {
        name: oldStation.name,
        lines: oldStation.lines,
        latitude: oldStation.latitude,
        longitude: oldStation.longitude,
        traffic: stationWithTraffic.fields.trafic,
        initialValue : initialValue,
    }
})


// Insérer en db les propriétés avec les bonnes informations
const Property = require("../models/Property")

const insertProperties = async () => {
    await Property.deleteMany({})
    const insertedProperties = await Property.insertMany(properties)
}

insertProperties()


// Mettre à jour la valeur initiale
