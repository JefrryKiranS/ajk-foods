const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to authenticate user
const authenticateUser = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

// Middleware to authorize roles
const authorizeRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: "Access Forbidden: You don't have permission" });
        }
        next();
    };
};

// Export both functions
module.exports = { authenticateUser, authorizeRole };
