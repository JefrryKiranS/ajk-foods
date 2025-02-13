const mongoose = require("mongoose");

const updateSchema = new mongoose.Schema({
    message: { type: String, required: true }
});

module.exports = mongoose.model("Update", updateSchema);
