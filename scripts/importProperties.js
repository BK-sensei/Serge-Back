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
    const stationWithMonument = monuments.find(m => m.station === stationName)
    console.log(stationWithMonument)  
    console.log(stationName) 
    

    const traffic = stationWithTraffic.fields.trafic
    let initialValue = 0
    let tax = 0
    let isHub = false
    let classLine = ""
    let index = 0
    let position = oldStation.lines.map(line => {
        return [line, index]
    })

    if (traffic < 1000000) {
        initialValue = 500
        tax = 100
        range = 1
    } 
    if (1000000 < traffic && traffic < 2000000) {
        initialValue = 1000 
        tax = 200
        range = 2
    }  
    if  (2000000 < traffic && traffic < 5000000) {
        initialValue = 1500
        tax = 300
        range = 3
    }  
    if  (5000000 < traffic && traffic < 8000000) {
        initialValue = 2500 
        tax = 400
        range = 4
    }  
    if  (8000000 < traffic && traffic < 10000000) {
        initialValue = 5000 
        tax = 500
        range = 6
    }  
    if  (10000000 < traffic && traffic < 30000000) {
        initialValue = 8000 
        tax = 600
        range = 7
    }  
    if (130000000 < traffic) {
        initialValue = 10000  
        tax = 700
        range = 8
    }

    // console.log(oldStation.lines)

    if (oldStation.lines.length > 1) {
        isHub = true
        if (oldStation.railStation) {
            classLine = "railStation"
        } else {
            classLine = "hub"
        }
    } else {
        classLine = `line_${oldStation.lines[0]}`
    }

    return {
        name: oldStation.name,
        lines: oldStation.lines,
        owner: null,
        auction: null,
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
        monument: stationWithMonument, 
        ratio: 1,
        position: position,
        class: classLine,
        range: range
    }

})


// Insérer en db les propriétés avec les bonnes informations
const Property = require("../models/Property")

const insertProperties = async () => {
    await Property.deleteMany({})
    const insertedProperties = await Property.insertMany(properties)
}

insertProperties()



