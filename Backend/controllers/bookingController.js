const Booking = require("../models/booking");

exports.createBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    console.error("Booking creation failed:", error.message);
    res.status(500).json({ error: "Failed to create booking", details: error.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ msg: "Booking not found" });

    if (booking.status === "Complete") {
      return res.status(400).json({ msg: "Already completed" });
    }

    booking.status = "Complete";
    booking.completedAt = new Date();
    await booking.save();

    res.json({ msg: "Booking marked complete", booking });
  } catch (error) {
    res.status(500).json({ msg: "Failed to update status" });
  }
};

exports.getBookingCount = async (req, res) => {
  try {
    const count = await Booking.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: "Failed to count bookings" });
  }
};



// controllers/bookingController.js


exports.bulkDeleteBookings = async (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids) || !ids.length) {
    return res.status(400).json({ message: 'No booking IDs provided' });
  }
  try {
    await Booking.deleteMany({ _id: { $in: ids } });
    res.json({ message: `Deleted ${ids.length} bookings` });
  } catch (err) {
    console.error('Bulk delete error:', err);
    res.status(500).json({ message: 'Server error during delete' });
  }
};


