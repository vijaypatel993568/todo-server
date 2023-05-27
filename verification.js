var jwt = require('jsonwebtoken')
function verifyToken(req, res, next) {
    var token = req.headers.authorization
    jwt.verify(token, process.env.SAULTKEY, (error) => {
        if (error) {
            res.send({ result: "Fail", message: "You are Unathorized user" })
        }
        else
            next()
    })

}
module.exports = verifyToken