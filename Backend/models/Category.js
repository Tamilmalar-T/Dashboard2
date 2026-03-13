// models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    status: { type: String, default: 'active' }
  },
  { timestamps: true } // This enables createdAt and updatedAt
);

module.exports = mongoose.model("Category", categorySchema);
