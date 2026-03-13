const express = require("express");
const router = express.Router();

const {
  createBooking,
  getBookings,
  updateBookingStatus,
  getBookingCount,
  bulkDeleteBookings
  
} = require("../controllers/bookingController");

router.post("/", createBooking);
router.get("/", getBookings);
router.put("/status/:id", updateBookingStatus);

// 📌 Booking count
router.get("/count", getBookingCount);
  router.delete('/bulk-delete', bulkDeleteBookings);







module.exports = router;
