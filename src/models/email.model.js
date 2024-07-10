const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    isRegistered: { type: Boolean, default: false },
    confirmationCode: { type: String, required: true },
    city: { type: String, required: true },
});

module.exports = mongoose.model("Email", emailSchema);
