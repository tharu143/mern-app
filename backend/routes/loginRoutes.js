const express = require("express");
const router = express.Router();
const User = require("../models/User");  // Assuming you have a User model

router.post("/", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email, role });

    if (user && user.password === password) {
      return res.status(200).json({ success: true, message: "Login successful!" });
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials!" });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error!" });
  }
});

module.exports = router;
