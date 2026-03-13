// const mongoose = require("mongoose");

// const stylistSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   speciality: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//   },
//    status: { type: String, default: 'enable', enum: ['enable', 'disable'] }
// });

// module.exports = mongoose.model("Stylist", stylistSchema);
const mongoose = require("mongoose");

const stylistSchema = new mongoose.Schema({
  name: String,
  speciality: String,
  image: String,
  status: {
    type: String,
    enum: ["enable", "disable"],
    default: "enable",
  },
});

module.exports = mongoose.model("Stylist", stylistSchema);

