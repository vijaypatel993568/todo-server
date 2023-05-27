const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "name must be required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password must be required"]
    }

})
const user = new mongoose.model("user", userSchema)
module.exports = user