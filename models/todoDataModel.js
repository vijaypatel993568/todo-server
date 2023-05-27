const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    todoData: {
        type: String,
        required: [true, "Todo Data must be required"]
    }
})
const todoData = new mongoose.model("todoData", userSchema)
module.exports = todoData