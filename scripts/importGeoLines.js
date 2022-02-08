


// Se connecter à la base de données
const fs = require('fs')
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://serge:KonexioSerge@serge.8dqas.mongodb.net/Serge?retryWrites=true&w=majority")
const db = mongoose.connection

db.on("error", err => console.log(err))
db.once("open", () => console.log("connect to db"))

const lines = require("../json/lines.json")
const Property = require("../models/Property")

const doStuff = async () => {
    const properties = await Property.find()
    

    const geoLines = lines.map(line => {
        const type = line.paths.length > 1 ? "MultiLineString" : "LineString"
        let lineCoordinates = line.paths.map(path => {
            return path.map(stationName => {
                const property = properties.find(p => p.keyName === stationName)

                if (!property) {
                    return stationName
                }

                return [property.latitude, property.longitude]
            })
        })

        if (type === "LineString") {
            lineCoordinates = lineCoordinates[0]
        }

        
        return {
            type,
            coordinates: lineCoordinates,
            color: line.color
        }
    })

    fs.writeFile("../json/geoLines.json", JSON.stringify(geoLines), (err) => {
        console.log(err)
    })


}

doStuff()
