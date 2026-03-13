const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel"); // adjust path if needed

// =========================
// ADMIN DEFAULT CREDENTIALS
// =========================
const DEFAULT_EMAIL = "admin@123";
const DEFAULT_PASSWORD = "123";
const JWT_SECRET = "yourSecretKey"; // use dotenv in production

// ==================================================
// AUTO-CREATE DEFAULT ADMIN IF NOT ALREADY IN DB
// ==================================================
(async () => {
  try {
    const adminExists = await Admin.findOne({ email: DEFAULT_EMAIL });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 10);
      await Admin.create({
        email: DEFAULT_EMAIL,
        password: hashedPassword,
      });
      console.log("✅ Default Admin Created");
    }
  } catch (err) {
    console.log("Error creating default admin:", err);
  }
})();

// ================================
// POST → /api/admin/login
// ================================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check admin exists
    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(404).json({ message: "Admin not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid password" });

    // Create JWT token
    const token = jwt.sign({ id: admin._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      message: "Login successful",
      email: admin.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
