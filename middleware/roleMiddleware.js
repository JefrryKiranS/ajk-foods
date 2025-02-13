const roleMiddleware = (requiredRoles) => {
    return (req, res, next) => {
        try {
            // Check if user is authenticated
            if (!req.user) {
                return res.status(401).json({ message: "Unauthorized: No user data found" });
            }

            // Check if user's role is allowed
            if (!requiredRoles.includes(req.user.role)) {
                return res.status(403).json({ message: "Forbidden: You do not have access" });
            }

            next(); // User has the required role, proceed to the next middleware
        } catch (error) {
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    };
};

module.exports = roleMiddleware;
