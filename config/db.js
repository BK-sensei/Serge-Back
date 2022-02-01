require("dotenv").config()
const mongoose = require("mongoose")

const DB_URL = process.env.DB_URL

const dbConnect = () => {
    const dbName = 'serge'  
    try {
      mongoose.connect(DB_URL)
      console.log(`Connected to ${dbName} database`)
    } catch (err) {
      console.log(err)
    }
  }
  
  module.exports = { 
    dbConnect
  }