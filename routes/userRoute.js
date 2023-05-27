const express = require("express")
const router = express.Router()
const user = require("../models/userModel")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const verifyToken = require("../verification");




router.post("/", async (req, res) => {
    var data = new user(req.body)

    bcrypt.hash(req.body.password, 12, async function (err, hash) {
        if (err)
            res.send({ result: "Fail", message: "internal server error while creating hash" })
        else {
            data.password = hash
            try {
                await data.save()
                res.send({ result: "Done", message: "User Registered", data: data })

            } catch (error) {
                if (error.keyValue)
                    res.send({ result: "Fail", message: "name must be unique" })
                else if (error.errors.username)
                    res.send({ result: "Fail", message: error.errors.username.message })
                else if (error.errors.password)
                    res.send({ result: "Fail", message: error.errors.password.message })

                else
                    res.send({ result: "Fail", message: "internal server error" })

            }

        }
    })
})
router.get("/", verifyToken, async (req, res) => {

    try {
        var data = await user.find()
        res.send({ result: "Done", total: data.length, message: "Total Registered User", data: data })
    } catch (error) {
        res.send({ result: "Fail", message: "record not Found", data: data })

    }
})

router.post("/login", async (req, res) => {

    try {

        var data = await user.findOne({ username: req.body.username })
        if (data) {
            var match = await bcrypt.compare(req.body.password, data.password)
            if (match) {

                jwt.sign({ data }, process.env.SAULTKEY, (error, token) => {
                    if (error) {
                        res.send({ result: "Fail", message: "your are not authorized user" })
                    }
                    else {
                        res.send({ result: "Done", total: data.length, data: data, token })
                    }
                })

            } else {
                res.send({ result: "Fail", message: "username or password is invalid" })
            }

        }
    } catch (error) {
        res.send({ result: "Fail", message: "record not Found" })

    }

})

module.exports = router