const express = require("express");
const Update = require("../models/Update");

const router = express.Router();

// Get the latest update message
router.get("/", async (req, res) => {
    try {
        const latestUpdate = await Update.findOne().sort({ _id: -1 }); // Get the latest update
        res.json({ message: latestUpdate ? latestUpdate.message : "Welcome to AJK Foods ERP" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Set a new update message (for admin use)
router.post("/", async (req, res) => {
    try {
        const { message } = req.body;
        await Update.create({ message });
        res.json({ message: "Update message saved successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
