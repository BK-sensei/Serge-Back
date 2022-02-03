const verifyOwner = (req, res, next) => {
    if (req.user === req.body.owner[0]) { 
        next()  
    } else {
        res.status(401).send("Unauthorized")
    }
}

module.exports = {
    verifyOwner,
    verifyUpgrade
}