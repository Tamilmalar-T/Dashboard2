// // /models/setting.js
// const mongoose = require("mongoose");

// const settingSchema = new mongoose.Schema({
//   title: String,
//   subtitle: String,
//   buttonText: String,
//   image: String,
// });

// module.exports = mongoose.model("Setting", settingSchema);
// backend/models/Banner.js
const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    buttonText: { type: String, required: true },
    image: { type: String, required: true }, // file name
  },
  { timestamps: true }
);

module.exports = mongoose.model('Banner', bannerSchema);
