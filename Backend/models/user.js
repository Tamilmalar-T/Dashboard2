const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true, unique: true },
  location: String,
  dob: Date,
  gender: String,
  password: String
});

module.exports = mongoose.model('User', UserSchema);
