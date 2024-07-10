let mongoose = require("mongoose")
require('dotenv').config()

exports.db = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
        })
        console.log("Connect to MongoDB successfully")

    }
    catch (err) {
        console.log(err)
        return
    }
}