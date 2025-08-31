const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // <- required for cookies
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5001;


// Enable CORS for frontend with credentials
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true,              // allow sending cookies
}));

app.use(express.json());
app.use(cookieParser()); // Parse cookies from requests

// --- Connect to MongoDB ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));

// --- API Routes ---
app.use('/api/auth', require('./Routes/auth')); // Auth routes

// --- Start server ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
