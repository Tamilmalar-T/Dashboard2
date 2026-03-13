
// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const userRoutes = require("./Router/userRouter");
const categoryRoutes = require("./Router/categoryRoutes");
const serviceRoutes = require("./Router/serviceRoutes");
const stylistRoutes = require("./Router/stylistRoutes");
const bookingRoutes = require("./Router/bookingRoutes");
const adminRoutes = require("./Router/adminRoutes");
const bannerRoutes = require('./Router/bannerRoutes');
const logoRoutes = require('./Router/logoRoutes');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // image static path



// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/salon-booking", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection failed:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/stylists", stylistRoutes);
app.use("/api/bookings", bookingRoutes);
app.use('/api/banner',bannerRoutes );
app.use('/api/logo', logoRoutes);


app.use("/api/admin", adminRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Salon Booking API is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});








