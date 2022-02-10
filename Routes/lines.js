const express = require("express");
const app = express()

const lines = require("../json/lines.json")

// Récupérer toutes les lignes
app.get('/', async (req, res) => {
    console.log(lines)
    res.json(lines) 
})

module.exports = app