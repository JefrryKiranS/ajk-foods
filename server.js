require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected"); // Added protected routes
const updateRoutes = require("./routes/update"); // Import update routes
const systemUpdatesRoute = require("./routes/systemUpdates");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes); // Register the protected routes
app.use("/api/updates", updateRoutes); // Register update route
app.use("/api/system", systemUpdatesRoute);

// Load environment variables
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ajkfoods";
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    console.error("❌ FATAL ERROR: JWT_SECRET is not defined.");
    process.exit(1);
}

// Database Connection
mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => {
        console.error("❌ MongoDB Connection Failed:", err);
        process.exit(1);
    });

// Start Server
//app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server running on port ${PORT}`));


