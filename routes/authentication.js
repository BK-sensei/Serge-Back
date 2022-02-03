const express = require("express")
const app = express()
const passport = require("../config/passport")
const bcrypt = require("bcrypt")
const User = require("../models/User")
const { verifyExistingUser } = require("../middlewares/auth")

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

// Se créer un compte sur SergeSubway
app.post('/signup', verifyExistingUser, async (req, res) => {
    try {
      const hash = await bcrypt.hash(req.body.password, 8)
  
      const newUser = await User.create({
        ...req.body,
        password: hash
      })
  
      res.json(newUser)
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: "Oups, something went wrong" })
    }
})

// Rester connecté dans le front même lorsque l'on recharge la page
// => à appeler en front dans le componentDidMount de mon context User
app.get('/me', (req, res) => {
    if (req.user) {
      res.json(req.user)
    } else {
      res.status(401).json({ error: "Unauthorized" })
    }
})

// Se déconnecter de son compte SergeSubway
app.delete('/logout', async (req, res) => {
    req.logOut()
    res.status(200).send({ success: "You've been logged out"})
})

module.exports = app