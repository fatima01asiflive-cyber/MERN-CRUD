# 🚀 MERN Stack CRUD Application

A complete Full Stack CRUD (Create, Read, Update, Delete) application built with **MongoDB**, **Express**, **React**, and **Node.js** using **Vite** for fast development.

## ✨ Features

✅ Full CRUD Operations  
✅ React 19 with Vite for fast development  
✅ Express.js REST API  
✅ MongoDB database integration  
✅ Bootstrap UI styling  
✅ Form validation and error handling  
✅ In-memory fallback for development (works without MongoDB)  
✅ Ready for deployment on Vercel  
✅ ESLint configured for code quality  

## 📁 Project Structure

```
CRUD/
├── server/                 # Node.js & Express Backend
│   ├── server.js          # Main server file
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── models/
│   │   └── User.js        # User schema
│   └── routes/
│       └── userRoutes.js  # API endpoints
├── client/                # React Frontend (Vite)
│   ├── src/
│   │   ├── App.jsx        # Main app component
│   │   ├── Users.jsx      # Users list page
│   │   ├── CreateUser.jsx # Create user form
│   │   ├── UpdateUser.jsx # Update user form
│   │   ├── api.js         # API service
│   │   └── main.jsx       # React entry point
│   └── package.json       # Client dependencies
├── package.json           # Root package.json
├── vercel.json           # Vercel deployment config
├── .env.example          # Environment variables template
└── README.md             # This file
```

---

## 🔧 Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (Local or Cloud - MongoDB Atlas)
- **npm** or **yarn**
- **Git** (for GitHub deployment)

---

## 📦 Installation & Setup

### 1️⃣ **Clone & Install Dependencies**

```bash
git clone <repository-url>
cd CRUD
npm install
cd client && npm install && cd ..
```

### 2️⃣ **Create Environment File**

```bash
cp .env.example .env
```

Edit `.env` and configure:
```env
MONGODB_URI=mongodb://localhost:27017/crud_app
PORT=5000
VITE_API_URL=http://localhost:5000
```

---

## 🗄️ MongoDB Setup

### **Option A: Local MongoDB**
```bash
# Start MongoDB server
mongod
```

### **Option B: MongoDB Atlas (Cloud)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Copy the connection string
4. Update `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/crud_app
   ```

**Note:** The app works even without MongoDB! It uses in-memory storage as fallback during development.

---

## 🚀 Running the Application

### **Option 1: Run Backend & Frontend Separately**

**Terminal 1 - Start Backend (Port 5000):**
```bash
npm run dev
```

**Terminal 2 - Start Frontend (Port 5173):**
```bash
npm run client
```

### **Option 2: Run Backend Only**
```bash
npm start
```

**Then manually start client:**
```bash
cd client && npm run dev
```

---

## 📊 API Endpoints

All endpoints are prefixed with `http://localhost:5000/api/users`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Get all users |
| `GET` | `/:id` | Get user by ID |
| `POST` | `/` | Create new user |
| `PUT` | `/:id` | Update user |
| `DELETE` | `/:id` | Delete user |

### **Example Requests:**

**GET all users:**
```bash
curl http://localhost:5000/api/users
```

**CREATE user:**
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","age":25}'
```

**UPDATE user:**
```bash
curl -X PUT http://localhost:5000/api/users/USER_ID \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"jane@example.com","age":26}'
```

**DELETE user:**
```bash
curl -X DELETE http://localhost:5000/api/users/USER_ID
```

---

## 🎯 Features

✅ **Read Users** - View all users in a responsive table  
✅ **Create User** - Add new users with form validation  
✅ **Update User** - Edit existing user information  
✅ **Delete User** - Remove users from database  
✅ **Form Validation** - Client & server-side validation  
✅ **Error Handling** - Comprehensive error messages  
✅ **Loading States** - User feedback during API calls  
✅ **Persistent Storage** - Data saved in MongoDB  
✅ **Responsive UI** - Bootstrap styling  

---

## 🔐 Validation Rules

### **Name:**
- Required
- Minimum 2 characters
- Maximum 50 characters

### **Email:**
- Required
- Valid email format
- Unique in database

### **Age:**
- Required
- Between 1 and 120 years

---

## 🐛 Troubleshooting

### **Error: "Failed to fetch users. Is the server running on port 5000?"**
- ✅ Make sure backend is running: `npm run dev`
- ✅ Check MongoDB is connected
- ✅ Verify `server/.env` has correct MongoDB URI

### **Error: "Cannot GET /api/users"**
- ✅ Backend server is not running
- ✅ Start backend first: `npm run dev`

### **Error: "MongoDB connection failed"**
- ✅ MongoDB service not running (for local setup)
- ✅ Check MongoDB Atlas credentials
- ✅ Verify firewall/network settings

### **Error: "Email already in use"**
- ✅ Email already exists in database
- ✅ Use a different email address

---

## 📝 Database Schema

### **User Model**
```javascript
{
  _id: ObjectId,
  name: String (required, 2-50 chars),
  email: String (required, unique, valid email),
  age: Number (required, 1-120),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🌐 Environment Variables

### **server/.env**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/crud_app
NODE_ENV=development
```

---

## 📱 Frontend URLs

| Page | URL | Purpose |
|------|-----|---------|
| Users List | `http://localhost:5173/` | View all users |
| Create User | `http://localhost:5173/create` | Add new user |
| Update User | `http://localhost:5173/update/:id` | Edit user |

---

## 🔄 API Service (`client/src/api.js`)

The `api.js` file provides helper functions for all API calls:

```javascript
import { 
  getUsers,        // Fetch all users
  getUserById,     // Fetch single user
  createUser,      // Create new user
  updateUser,      // Update user
  deleteUser       // Delete user
} from "./api";
```

---

## 🎓 Learning Outcomes

This project teaches:
- ✅ **Express.js** - Building REST APIs
- ✅ **MongoDB & Mongoose** - Database design & queries
- ✅ **React Hooks** - useState, useEffect, custom hooks
- ✅ **React Router** - Client-side routing
- ✅ **Axios** - HTTP requests
- ✅ **Form Validation** - Client & server validation

---

## 📤 Deployment Guide

### GitHub Setup

1. **Initialize Git (if not already done):**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/crud.git
git push -u origin main
```

2. **Push to GitHub:**
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

### 🚀 Deploy to Vercel

1. **Sign up/Login at [Vercel](https://vercel.com)**

2. **Import Project:**
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose your GitHub repository
   - Click "Import"

3. **Configure Environment Variables:**
   Go to Settings → Environment Variables and add:
   
   | Variable | Value |
   |----------|-------|
   | `MONGODB_URI` | Your MongoDB Atlas connection string |
   | `VITE_API_URL` | Your Vercel deployment URL (e.g., `https://your-project.vercel.app`) |

4. **Deploy:**
   - Click "Deploy"
   - Wait for the deployment to complete
   - Your app will be live at `https://your-project.vercel.app`

### Getting MongoDB Atlas Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Click "Connect" on your cluster
4. Choose "Drivers" connection method
5. Copy the connection string
6. Replace `<username>`, `<password>`, and `<database>` with your values
7. Add it to Vercel environment variables as `MONGODB_URI`

### Vercel Configuration

The `vercel.json` file is pre-configured to:
- Route `/api/*` requests to the Express backend
- Serve the React frontend for all other routes
- Support environment variables

### Build Configuration

The root `package.json` includes a build script:
```bash
npm run build:all    # Builds both frontend and backend
```

---

## 🐛 Troubleshooting

### **Error: Cannot find module**
```bash
# Solution: Reinstall dependencies
rm -rf node_modules client/node_modules
npm install
cd client && npm install
```

### **Port 5000 already in use**
```bash
# Find and kill the process using port 5000
# Linux/Mac:
lsof -ti:5000 | xargs kill -9

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### **MongoDB connection failed**
- Ensure MongoDB is running (local) or check your connection string (Atlas)
- The app will use in-memory storage as fallback if MongoDB is unavailable
- Check the browser console for specific error messages

### **Build fails on Vercel**
- Ensure all environment variables are set correctly
- Check that MongoDB connection string is valid
- Review Vercel build logs for specific errors

### **CORS errors**
- CORS is already configured in `server/server.js`
- Make sure the API URL matches your Vercel deployment URL

---

## 📞 Support & Issues

- Check the **Troubleshooting** section above
- Review error messages in browser console (F12)
- Check Vercel deployment logs for backend errors
- Create a GitHub issue if you encounter problems

---

## 📄 License

ISC

---

## 🎉 You're Ready!

Your CRUD application is now ready for:
- ✅ Local development
- ✅ GitHub collaboration
- ✅ Vercel deployment
- ✅ Production use

Happy coding! 🚀
- ✅ **Error Handling** - Comprehensive error management
- ✅ **CORS** - Cross-origin requests

---

## 📚 Useful Commands

```bash
# Backend
npm run dev      # Start backend with auto-reload
npm start        # Start backend

# Frontend  
npm run client   # Start frontend
cd client && npm run dev

# Database
mongosh          # Connect to MongoDB shell
use crud_app     # Switch to crud_app database
db.users.find()  # View all users in database
db.users.deleteMany({})  # Clear all users (careful!)

# Build
cd client && npm run build  # Build for production
```

---

## 🎉 Success Indicators

You'll know everything is working when:

✅ Backend running on `http://localhost:5000`  
✅ Frontend running on `http://localhost:5173`  
✅ MongoDB connected successfully  
✅ Users table displays 2 sample users  
✅ Can create, edit, and delete users  
✅ Data persists after page refresh  
✅ No errors in browser console  

---

## 📧 API Response Format

All API responses follow this format:

**Success (200-201):**
```json
{
  "success": true,
  "message": "Operation successful",
  "count": 5,
  "data": [...]
}
```

**Error (400-500):**
```json
{
  "success": false,
  "message": "Error description",
  "error": "detailed error message"
}
```

---

## 🚀 Next Steps

1. **Start MongoDB:** `mongod`
2. **Install dependencies:** `npm install && cd client && npm install`
3. **Start backend:** `npm run dev`
4. **Start frontend:** `npm run client`
5. **Open browser:** `http://localhost:5173/`
6. **Test CRUD operations!**

---

## 💡 Tips

- Use `MongoCompass` for visual MongoDB management
- Use `Postman` to test API endpoints
- Check `browser DevTools Console` for errors
- Use `Network tab` to monitor API calls
- Enable `Redux DevTools` for state debugging

---

**Happy coding! 🎉**
