const mongoose = require("mongoose")
function dbConnect() {
    try {
        mongoose.connect("mongodb://localhost:27017/todoDatabase")
        console.log("database is connected");
    } catch (error) {
        console.log(error);
    }
}
dbConnect()