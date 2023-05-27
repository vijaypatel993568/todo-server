const express = require("express")
const router = express.Router()
const todoData = require("../models/todoDataModel")
const verifyToken = require("../verification");




router.post("/", async (req, res) => {
    var data = new todoData(req.body)
    try {
        await data.save()
        res.send({ result: "Done", message: "record is created", data: data })

    } catch (error) {

        if (error.errors.todoData)
            res.send({ result: "Fail", message: error.errors.todoData.message })

        else
            res.send({ result: "Fail", message: "internal server error" })

    }
})
router.get("/", verifyToken, async (req, res) => {

    try {
        var data = await todoData.find()
        res.send({ result: "Done", total: data.length, message: "record is Founded", data: data })
    } catch (error) {
        res.send({ result: "Fail", message: "record not Found", data: data })

    }
})
router.get("/:_id", verifyToken, async (req, res) => {

    try {

        var data = await todoData.findOne({ _id: req.params._id })
        res.send({ result: "Done", total: data.length, message: "record is Founded", data: data })
    } catch (error) {
        res.send({ result: "Fail", message: "record not Found" })

    }
})
router.put("/:_id", verifyToken, async (req, res) => {

    try {
        var data = await todoData.findOne({ _id: req.params._id })
        console.log(data);
        if (data) {
            data.todoData = req.body.todoData ?? data.todoData
            await data.save()
        }
        res.send({ result: "Done", total: data.length, message: "record is updated", data: data })
    } catch (error) {
        res.send({ result: "Fail", message: "record not Found" })

    }
})
router.delete("/:_id", verifyToken, async (req, res) => {

    try {
        await todoData.deleteOne({ _id: req.params._id })
        res.send({ result: "Done", message: "record is deleted" })
    } catch (error) {
        res.send({ result: "Fail", message: "record not Found" })

    }
})



module.exports = router