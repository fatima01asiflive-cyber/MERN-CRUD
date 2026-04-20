const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/crud_app";

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("✅ MongoDB Connected Successfully");
        console.log(`📍 Database: ${mongoose.connection.name}`);
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        console.log("⚠️  Server will continue without database connection");
        // Don't exit process, let the server run for development
        // process.exit(1);
    }
};

module.exports = connectDB;
