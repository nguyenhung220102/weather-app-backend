const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, default: false },
});

module.exports = mongoose.model("City", citySchema);
