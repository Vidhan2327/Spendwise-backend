const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../Controllers/AuthController");
const auth = require("../Middleware/Auth"); // <-- import middleware

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Protected route 
router.get("/me", auth, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});


module.exports = router;
