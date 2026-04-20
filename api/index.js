const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("../server/config/db");
const userRoutes = require("../server/routes/userRoutes");

// In-memory storage for development mode
const inMemoryUsers = [
    { _id: "1", name: "John Doe", email: "john@example.com", age: 30, createdAt: new Date() },
    { _id: "2", name: "Jane Smith", email: "jane@example.com", age: 25, createdAt: new Date() },
    { _id: "3", name: "Bob Johnson", email: "bob@example.com", age: 35, createdAt: new Date() }
];

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/users", userRoutes);

// Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "Server is running", timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;
