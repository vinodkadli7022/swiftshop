const express = require("express");
const Booking = require("../models/Booking");
const router = express.Router();

// Create booking
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all bookings
router.get("/", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

// Update booking status
router.put("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete booking
router.delete("/:id", async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: "Booking deleted" });
});

module.exports = router;
