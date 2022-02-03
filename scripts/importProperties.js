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

// Récupérer le json des monuments
const monuments = require("../json/monuments.json")
   
// Mixer les jeux de données pour avoir 
// les propriétés avec les bonnes informations
const stationNames = Object.keys(stations.freq)

const properties = stationNames.map(stationName => {
    const oldStation = stations.freq[stationName]  
    const stationWithTraffic = stationsWithTraffic.records.find(s => s.fields.station === stationName)
    const stationWitMonument = monuments.find(m => m.station === stationName)
    console.log(stationWitMonument)  
     
    const traffic = stationWithTraffic.fields.trafic
    let initialValue = 0
    let tax = 0
    let isHub = false
    let index = 0
    let position = oldStation.lines.map(line => {
        return [line, index]
    })

    if (traffic < 1000000) {
        initialValue = 500
        tax = 100
    } 
    if (1000000 < traffic && traffic < 2000000) {
        initialValue = 1000 
        tax = 200
    }  
    if  (2000000 < traffic && traffic < 5000000) {
        initialValue = 1500
        tax = 300
    }  
    if  (5000000 < traffic && traffic < 8000000) {
        initialValue = 2500 
        tax = 400
    }  
    if  (8000000 < traffic && traffic < 10000000) {
        initialValue = 5000 
        tax = 500
    }  
    if  (10000000 < traffic && traffic < 30000000) {
        initialValue = 8000 
        tax = 600
    }  
    if (130000000 < traffic) {
        initialValue = 10000  
        tax = 700
    }

    // console.log(oldStation.lines)

    if (oldStation.lines.length > 0) {
        isHub = true
    }

    return {
        name: oldStation.name,
        lines: oldStation.lines,
        isHub: isHub,
        latitude: oldStation.latitude,
        longitude: oldStation.longitude,
        traffic: stationWithTraffic.fields.trafic,
        initialValue: initialValue,
        currentValue: initialValue, 
        tax: tax, 
        vendingMachines: 0,
        shops: 0,
        shoppingMall: 0,
        monument: stationWitMonument, 
        ratio: 1,
        position: position
        // ratio: 1 + (vendingMachines.value*0.2) + (shops.value*0.4) + (shoppingMall.value*0.6),     
    }

})


// Insérer en db les propriétés avec les bonnes informations
const Property = require("../models/Property")

const insertProperties = async () => {
    await Property.deleteMany({})
    const insertedProperties = await Property.insertMany(properties)
}

insertProperties()



