const verifyExistingUser = (req, res, next) => {
    if (!req.user) { 
        res.status(401).send("Unauthorized")
    } else {
        next()
    }
}

module.exports = {
    verifyExistingUser
}