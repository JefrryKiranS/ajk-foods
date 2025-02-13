const express = require("express");
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");

const router = express.Router();

// Admin Protected Route
router.get("/admin", authenticateUser, authorizeRole("admin"), (req, res) => {
    res.json({ message: "Welcome Admin! You have access to this protected route." });
});

// User Protected Route
router.get("/user", authenticateUser, (req, res) => {
    res.json({ message: "Welcome User! You have access to this protected route." });
});

module.exports = router;
