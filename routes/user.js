const express = require("express")
const app = express()

const User = require("../models/User")

// Créer un compte pour jouer
app.post('/', async (req, res) => {
    try {
        const user = await new User({ ...req.body })

        user.save(async (err, user) => {
            if (user) {
                res.json(user)
                return
            }

            console.log(err)
            res.status(500).json({ error : err })
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error : err })
    }
})

// Afficher tous les joueurs
app.get('/', async (req, res) => {
    try {
        const users = await User.find()
        // .populate('user')
        .exec()

        res.json(users)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error : err })
    }
})

// Afficher un joueur selon son id
app.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findById(id)
        // .populate('user')
        .exec()

        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error : err })
    }
})


// Modifier les informations d'un joueur
app.put('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true }
        ).exec()

    res.json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error : err })
    }
})

// Supprimer un joueur
app.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        await User.deleteOne({ _id: id })

        res.json({ sucess: 'User successfully deleted'})
    } catch (err) {
        console.log(err)
        res.status(500).json({ error : err })
    }
})

module.exports = app