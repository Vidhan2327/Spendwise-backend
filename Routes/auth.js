const express = require('express');
const router = express.Router();
const { register, login,logout } = require('../Controllers/AuthController');

// Define the route for user registration
// When a POST request is made to '/api/auth/register', the 'register' controller function will be executed.
router.post('/register', register);

// Define the route for user login
// When a POST request is made to '/api/auth/login', the 'login' controller function will be executed.
router.post('/login', login);
router.post("/logout", logout); 
module.exports = router;
