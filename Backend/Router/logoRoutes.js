const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Logo = require('../models/Logo');

const router = express.Router();

// Ensure logo upload folder exists
const uploadDir = path.join(__dirname, '..', 'uploads', 'logos');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

/** ✅ POST /api/logo */
router.post('/', upload.single('logo'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const newLogo = new Logo({ image: req.file.filename });
    await newLogo.save();

    res.status(201).json({ message: 'Logo uploaded', logo: newLogo });
  } catch (error) {
    console.error('Upload failed:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

/** ✅ GET /api/logo */
router.get('/', async (req, res) => {
  try {
    const logos = await Logo.find().sort({ createdAt: -1 });
    res.json(logos);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch logos', error: error.message });
  }
});

/** ✅ GET /api/logo/latest */
router.get('/latest', async (req, res) => {
  try {
    const logo = await Logo.findOne().sort({ createdAt: -1 });
    if (!logo) return res.status(404).json({ message: 'No logo found' });

    res.json(logo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch latest logo', error: error.message });
  }
});

/** ✅ PUT /api/logo/update/:id */
router.put('/update/:id', upload.single('logo'), async (req, res) => {
  try {
    const { id } = req.params;

    const logo = await Logo.findById(id);
    if (!logo) return res.status(404).json({ message: 'Logo not found' });

    // Delete old image
    const oldPath = path.join(uploadDir, logo.image);
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

    // Update logo file
    if (req.file) logo.image = req.file.filename;

    await logo.save();
    res.json({ message: 'Logo updated successfully', logo });
  } catch (error) {
    console.error('Update failed:', error);
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedLogo = await Logo.findByIdAndDelete(req.params.id);
    if (!deletedLogo) return res.status(404).json({ message: "Logo not found" });
    res.json({ message: "Logo deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/bulk-delete", async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids)) {
      return res.status(400).json({ message: "Invalid IDs array" });
    }
    const result = await Logo.deleteMany({ _id: { $in: ids } });
    res.json({ message: `${result.deletedCount} logos deleted` });
  } catch (err) {
    console.error("Bulk delete failed:", err);
    res.status(500).json({ message: "Bulk delete failed" });
  }
});


module.exports = router;
