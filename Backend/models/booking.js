const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  stylist: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  cartItems: [
    {
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "Request" },
  completedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
