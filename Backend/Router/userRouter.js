



// module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add user
router.post('/add', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json({ message: 'User added successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update user
router.put('/:id', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE user
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.get("/count", async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: "Failed to count users" });
  }
});

// routes/userRoutes.js or similar
router.post('/check', async (req, res) => {
  const { email, contact } = req.body;

  try {
    const emailExists = await User.findOne({ email });
    const contactExists = await User.findOne({ contact });

    if (emailExists) {
      return res.json({ exists: true, message: 'Email already exists' });
    }

    if (contactExists) {
      return res.json({ exists: true, message: 'Contact number already exists' });
    }

    return res.json({ exists: false });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
