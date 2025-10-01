
exports.getDashboard = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Dashboard data",
    user: req.user
  });
};


exports.getBudgets = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Budgets data"
  });
};


exports.getSettings = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Settings data"
  });
};
