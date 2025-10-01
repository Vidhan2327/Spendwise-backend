
const express = require("express");
const router = express.Router();
const auth = require("../Middleware/Auth");
const {
  getDashboard,
  getBudgets,
  getSettings
} = require("../Controllers/AppController");

// Apply auth middleware to all routes below
router.use(auth);

router.get("/dashboard", getDashboard);
router.get("/budgets", getBudgets);
router.get("/settings", getSettings);

module.exports = router;
