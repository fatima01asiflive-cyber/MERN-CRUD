import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_URL = `${API_BASE_URL}/api/users`;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Get all users
export const getUsers = async () => {
    try {
        const response = await api.get("/");
        return response.data.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        // Fallback to mock data for development
        if (error.message.includes('timeout') || error.code === 'ECONNREFUSED') {
            console.log("Using mock data for development");
            return [
                { _id: "1", name: "John Doe", email: "john@example.com", age: 30 },
                { _id: "2", name: "Jane Smith", email: "jane@example.com", age: 25 },
                { _id: "3", name: "Bob Johnson", email: "bob@example.com", age: 35 }
            ];
        }
        throw error;
    }
};

// Get single user
export const getUserById = async (id) => {
    try {
        const response = await api.get(`/${id}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        // Fallback to mock data for development
        if (error.message.includes('timeout') || error.code === 'ECONNREFUSED') {
            console.log("Using mock data for development");
            const mockUsers = {
                "1": { _id: "1", name: "John Doe", email: "john@example.com", age: 30 },
                "2": { _id: "2", name: "Jane Smith", email: "jane@example.com", age: 25 },
                "3": { _id: "3", name: "Bob Johnson", email: "bob@example.com", age: 35 }
            };
            const user = mockUsers[id];
            if (!user) throw new Error("User not found");
            return user;
        }
        throw error;
    }
};

// Create user
export const createUser = async (userData) => {
    try {
        const response = await api.post("/", userData);
        return response.data.data;
    } catch (error) {
        console.error("Error creating user:", error);
        // Fallback for development
        if (error.message.includes('timeout') || error.code === 'ECONNREFUSED') {
            console.log("Simulating user creation for development");
            return { _id: Date.now().toString(), ...userData };
        }
        throw error.response?.data?.message || error.message;
    }
};

// Update user
export const updateUser = async (id, userData) => {
    try {
        const response = await api.put(`/${id}`, userData);
        return response.data.data;
    } catch (error) {
        console.error("Error updating user:", error);
        // Fallback for development
        if (error.message.includes('timeout') || error.code === 'ECONNREFUSED') {
            console.log("Simulating user update for development");
            return { _id: id, ...userData };
        }
        throw error.response?.data?.message || error.message;
    }
};

// Delete user
export const deleteUser = async (id) => {
    try {
        const response = await api.delete(`/${id}`);
        return response.data.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        // Fallback for development
        if (error.message.includes('timeout') || error.code === 'ECONNREFUSED') {
            console.log("Simulating user deletion for development");
            return { success: true };
        }
        throw error;
    }
};

export default api;
