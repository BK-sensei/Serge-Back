const express = require("express")
const app = express()
const passport = require("../config/passport")
const User = require("../models/User")

// Se connecter à son compte SergeSubway
app.post('/login', passport.authenticate("local"), async (req, res) => {
    console.log(req.user);
    if (req.user) {
        req.logIn(req.user, err => {
            if(err) {
                res.status(401).json({ error: "Unauthorized" })
            } else {
                res.json(req.user)
            }
        })
    }
})

// Se déconnecter de son compte SergeSubway
app.delete('/logout', async (req, res) => {
    req.logOut()
    res.status(200).send({ success: "You've been logged out"})
})

module.exports = app