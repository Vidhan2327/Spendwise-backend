const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// --- User Registration Controller ---
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
        email: user.email,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

 
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // only HTTPS in prod
        sameSite: "strict",
        maxAge: 60 * 60 * 1000, // 1 hour
      })
      .status(201)
      .json({ success: true, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error("Registration Error:", error.message);
    res.status(500).send("Server error");
  }
};

// --- User Login Controller ---
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
        email: user.email,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set httpOnly cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
      })
      .status(200)
      .json({ success: true, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).send("Server error");
  }
};

// --- User Logout Controller ---
exports.logout = (req, res) => {
  res
    .clearCookie("token") // Remove the JWT cookie
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
};
