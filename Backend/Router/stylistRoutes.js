// const express = require("express");
// const router = express.Router();
// const upload = require("../middleware/uploads");
// const Stylist = require("../models/stylist");

// // POST - Add a new stylist
// router.post("/", upload.single("image"), async (req, res) => {
//   try {
//     const { name, speciality } = req.body;
//     const image = req.file ? req.file.filename : null;

//     const newStylist = new Stylist({
//       name,
//       speciality,
//       image,
//     });

//     await newStylist.save();
//     res.status(201).json({ message: "Stylist added successfully", stylist: newStylist });
//   } catch (error) {
//     console.error("Error adding stylist:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// });

// // GET - List all stylists
// router.get("/", async (req, res) => {
//   try {
//     const stylists = await Stylist.find();
//     res.json(stylists);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch stylists", error });
//   }
// });


// // DELETE a stylist
// router.delete('/:id', async (req, res) => {
//   try {
//     const stylist = await Stylist.findByIdAndDelete(req.params.id);
//     if (!stylist) return res.status(404).json({ error: "Stylist not found" });
//     res.status(200).json({ message: "Stylist deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // PUT update stylist
// router.put('/:id', upload.single('image'), async (req, res) => {
//   try {
//     const stylist = await Stylist.findById(req.params.id);
//     if (!stylist) return res.status(404).json({ error: "Stylist not found" });

//     stylist.name = req.body.name || stylist.name;
//     stylist.specialty = req.body.specialty || stylist.specialty;
//     stylist.email = req.body.email || stylist.email;
//     stylist.phone = req.body.phone || stylist.phone;

//     if (req.file) {
//       stylist.image = req.file.filename;
//     }

//     await stylist.save();
//     res.status(200).json({ message: "Stylist updated successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// // routes/stylist.js
// router.put('/api/stylists/:id', async (req, res) => {
//   try {
//     const updatedStylist = await Stylist.findByIdAndUpdate(
//       req.params.id,
//       { status: req.body.status },
//       { new: true }
//     );
//     res.json(updatedStylist);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to update status' });
//   }
// });



// module.exports = router;

const express = require('express');
const multer = require('multer');
const path = require('path');
const Stylist = require('../models/Stylist');
const stylist = require('../models/Stylist');

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// GET all stylists
router.get('/', async (req, res) => {
  try {
    const stylists = await Stylist.find();
    res.json(stylists);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stylists' });
  }
});

// POST new stylist
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const newStylist = new Stylist({
      name: req.body.name,
      speciality: req.body.speciality,
      image: req.file?.filename,
      status: req.body.status || 'enable',
    });
    const saved = await newStylist.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add stylist' });
  }
});

// PUT update stylist (edit name, speciality, image, status)
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      speciality: req.body.speciality,
      status: req.body.status,
    };
    if (req.file) updateData.image = req.file.filename;

    const updated = await Stylist.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update stylist' });
  }
});

// DELETE stylist
router.delete('/:id', async (req, res) => {
  try {
    await Stylist.findByIdAndDelete(req.params.id);
    res.json({ message: 'Stylist deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete stylist' });
  }
});

router.put("/:id/status", async (req, res) => {
  const { status } = req.body;
  if (!["enable", "disable"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const updatedStylist = await Service.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedStylist) {
      return res.status(404).json({ message: "Stylist not found" });
    }
    res.json({ message: `Stylist ${status}d successfully`, stylist: updatedStylist});
  } catch (err) {
    res.status(500).json({ message: "Failed to update status", error: err });
  }
});

module.exports = router;
