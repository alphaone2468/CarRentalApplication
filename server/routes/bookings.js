const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Create Booking
router.post('/', async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Bookings
router.get('/', async (req, res) => {
  const bookings = await Booking.find().populate('userId carId');
  res.json(bookings);
});

// Get Booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('userId carId');
    if (!booking) return res.sendStatus(404);
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update Booking
router.put('/:id', async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Booking
router.delete('/:id', async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
