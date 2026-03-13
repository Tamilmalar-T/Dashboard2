
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  offerPrice: { type: Number },
  description: { type: String },
  image: { type: String },
  status: { type: String, default: 'enable', enum: ['enable', 'disable'] }
  
},{ timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
