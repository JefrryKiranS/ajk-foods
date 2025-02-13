const express = require("express");
const router = express.Router();

let systemMessage = "Welcome to AJK Foods!"; // Default system message

// Route to fetch the system update message
router.get("/updates", (req, res) => {
    res.json({ message: systemMessage });
});

// Route to update the system message
router.post("/update", (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    systemMessage = message;
    res.json({ message: "System message updated successfully!" });
});

module.exports = router;
