const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// Routes
router.post("/", bookingController.createBooking);              // Create booking
router.get("/", bookingController.getBookings);                // Get all bookings
router.patch("/:id/status", bookingController.updateBookingStatus); // Update status
router.get("/count", bookingController.getBookingCount);       // Get total count
router.post("/bulk-delete", bookingController.bulkDeleteBookings); // Bulk delete

module.exports = router;