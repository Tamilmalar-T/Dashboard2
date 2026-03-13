


const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Service = require("../models/Service");

// Multer config for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

/** =======================
 *  POST: Add New Service
 *  ======================= */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { category, name, price, offerPrice, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const newService = new Service({
      category,
      name,
      price,
      offerPrice,
      description,
      image,
    });

    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    console.error("Error adding service:", err);
    res.status(500).json({ error: "Failed to add service" });
  }
});

/** =======================
 *  GET: All Services
 *  ======================= */
router.get("/", async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 }); // newest first
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

/** ==========================
 *  GET: Service Image
 *  ========================== */
router.get("/images/:filename", (req, res) => {
  const filePath = path.join(__dirname, "../uploads", req.params.filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send("Image not found");
  }
});

/** =======================
 *  DELETE: Delete Service
 *  ======================= */
router.delete("/:id", async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    // Delete associated image if exists
    if (service.image) {
      const imagePath = path.join(__dirname, "../uploads", service.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete service" });
  }
});

/** =======================
 *  PUT: Update Service
 *  ======================= */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updatedData = { ...req.body };
    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const updatedService = await Service.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(updatedService);
  } catch (err) {
    res.status(500).json({ message: "Failed to update service", error: err });
  }
});

/** =======================
 *  GET: Service By ID
 *  ======================= */
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json(service);
  } catch (err) {
    console.error("Error fetching service:", err);
    res.status(500).json({ error: "Failed to fetch service" });
  }
});

/** ================================
 *  PUT: Enable/Disable Service
 *  ================================ */
router.put("/:id/status", async (req, res) => {
  const { status } = req.body;
  if (!["enable", "disable"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json({ message: `Service ${status}d successfully`, service: updatedService });
  } catch (err) {
    res.status(500).json({ message: "Failed to update status", error: err });
  }
});

/** ================================================
 *  GET: Services By Category (Newest First)
 *  ================================================ */
router.get("/category/:categoryName", async (req, res) => {
  try {
    const { categoryName } = req.params;
    const services = await Service.find({ category: categoryName }).sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch services by category" });
  }
});

module.exports = router;
