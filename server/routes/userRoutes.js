const express = require("express");
const router = express.Router();
const User = require("../models/User");

// In-memory storage for development mode
const inMemoryUsers = [
    { _id: "1", name: "John Doe", email: "john@example.com", age: 30, createdAt: new Date() },
    { _id: "2", name: "Jane Smith", email: "jane@example.com", age: 25, createdAt: new Date() },
    { _id: "3", name: "Bob Johnson", email: "bob@example.com", age: 35, createdAt: new Date() }
];

const isMongoConnected = async () => {
    try {
        const admin = User.db.admin();
        await admin.ping();
        return true;
    } catch (error) {
        return false;
    }
};

// GET all users
router.get("/", async (req, res) => {
    try {
        const mongoConnected = await isMongoConnected();

        if (mongoConnected) {
            const users = await User.find().sort({ createdAt: -1 });
            return res.status(200).json({
                success: true,
                count: users.length,
                data: users,
            });
        } else {
            console.log("MongoDB not available, using in-memory data");
            return res.status(200).json({
                success: true,
                count: inMemoryUsers.length,
                data: inMemoryUsers,
            });
        }
    } catch (error) {
        console.log("MongoDB error, using in-memory data");
        res.status(200).json({
            success: true,
            count: inMemoryUsers.length,
            data: inMemoryUsers,
        });
    }
});

// GET single user by ID
router.get("/:id", async (req, res) => {
    try {
        const mongoConnected = await isMongoConnected();

        if (mongoConnected) {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
            return res.status(200).json({
                success: true,
                data: user,
            });
        } else {
            console.log("MongoDB not available, using in-memory data");
            const user = inMemoryUsers.find(u => u._id === req.params.id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
            return res.status(200).json({
                success: true,
                data: user,
            });
        }
    } catch (error) {
        console.log("MongoDB error, using in-memory data");
        const user = inMemoryUsers.find(u => u._id === req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            data: user,
        });
    }
});

// CREATE new user
router.post("/", async (req, res) => {
    try {
        const { name, email, age } = req.body;

        // Validation
        if (!name || !email || !age) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields",
            });
        }

        const mongoConnected = await isMongoConnected();

        if (mongoConnected) {
            // Check if email already exists
            const existingUser = await User.findOne({ email: email.toLowerCase() });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "Email already in use",
                });
            }

            const newUser = await User.create({
                name,
                email: email.toLowerCase(),
                age: parseInt(age),
            });

            return res.status(201).json({
                success: true,
                message: "User created successfully",
                data: newUser,
            });
        } else {
            console.log("MongoDB not available, using in-memory storage");
            // Check if email already exists in memory
            const existingUser = inMemoryUsers.find(u => u.email === email.toLowerCase());
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "Email already in use",
                });
            }

            const newUser = {
                _id: Date.now().toString(),
                name,
                email: email.toLowerCase(),
                age: parseInt(age),
                createdAt: new Date()
            };
            inMemoryUsers.push(newUser);

            return res.status(201).json({
                success: true,
                message: "User created successfully",
                data: newUser,
            });
        }
    } catch (error) {
        console.log("Error creating user:", error.message);
        // Fallback to in-memory storage
        const { name, email, age } = req.body;
        const existingUser = inMemoryUsers.find(u => u.email === email.toLowerCase());
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already in use",
            });
        }

        const newUser = {
            _id: Date.now().toString(),
            name,
            email: email.toLowerCase(),
            age: parseInt(age),
            createdAt: new Date()
        };
        inMemoryUsers.push(newUser);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: newUser,
        });
    }
});

// UPDATE user
router.put("/:id", async (req, res) => {
    try {
        const { name, email, age } = req.body;

        // Validation
        if (!name || !email || !age) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields",
            });
        }

        const mongoConnected = await isMongoConnected();

        if (mongoConnected) {
            // Check if email is unique (excluding current user)
            const existingUser = await User.findOne({
                email: email.toLowerCase(),
                _id: { $ne: req.params.id },
            });

            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "Email already in use by another user",
                });
            }

            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    name,
                    email: email.toLowerCase(),
                    age: parseInt(age),
                },
                {
                    new: true,
                    runValidators: true,
                }
            );

            if (!updatedUser) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            return res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: updatedUser,
            });
        } else {
            console.log("MongoDB not available, using in-memory storage");
            // Check if email is unique (excluding current user)
            const existingUser = inMemoryUsers.find(u => u.email === email.toLowerCase() && u._id !== req.params.id);
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "Email already in use by another user",
                });
            }

            const userIndex = inMemoryUsers.findIndex(u => u._id === req.params.id);
            if (userIndex === -1) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            const updatedUser = {
                ...inMemoryUsers[userIndex],
                name,
                email: email.toLowerCase(),
                age: parseInt(age),
            };
            inMemoryUsers[userIndex] = updatedUser;

            return res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: updatedUser,
            });
        }
    } catch (error) {
        console.log("Error updating user:", error.message);
        // Fallback to in-memory storage
        const { name, email, age } = req.body;
        const existingUser = inMemoryUsers.find(u => u.email === email.toLowerCase() && u._id !== req.params.id);
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already in use by another user",
            });
        }

        const userIndex = inMemoryUsers.findIndex(u => u._id === req.params.id);
        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const updatedUser = {
            ...inMemoryUsers[userIndex],
            name,
            email: email.toLowerCase(),
            age: parseInt(age),
        };
        inMemoryUsers[userIndex] = updatedUser;

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser,
        });
    }
});

// DELETE user
router.delete("/:id", async (req, res) => {
    try {
        const mongoConnected = await isMongoConnected();

        if (mongoConnected) {
            const user = await User.findByIdAndDelete(req.params.id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            return res.status(200).json({
                success: true,
                message: "User deleted successfully",
                data: user,
            });
        } else {
            console.log("MongoDB not available, using in-memory storage");
            const userIndex = inMemoryUsers.findIndex(u => u._id === req.params.id);
            if (userIndex === -1) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            const deletedUser = inMemoryUsers.splice(userIndex, 1)[0];
            return res.status(200).json({
                success: true,
                message: "User deleted successfully",
                data: deletedUser,
            });
        }
    } catch (error) {
        console.log("Error deleting user:", error.message);
        // Fallback to in-memory storage
        const userIndex = inMemoryUsers.findIndex(u => u._id === req.params.id);
        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const deletedUser = inMemoryUsers.splice(userIndex, 1)[0];
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: deletedUser,
        });
    }
});

module.exports = router;
