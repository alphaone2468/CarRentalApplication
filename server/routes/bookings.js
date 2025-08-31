const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking.model');
const { verifyToken } = require('../utils/auth');

// Create Booking
router.post('/', verifyToken, async (req, res) => {
  try {
    // const booking = await Booking.create(req.body);
    console.log("I am here",req.body)
    let newBooking = new Booking({...req.body,userId:req.user._id});
    newBooking = await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

// Get All Bookings
router.get('/', async (req, res) => {
  const bookings = await Booking.find().populate('userId carId');
  res.json(bookings);
});



router.get('/user/self', verifyToken, async (req, res) => {
  try {
    console.log(req.user._id);
    console.log(req.user._id);
    console.log(req.user._id);
    console.log(req.user._id);
    console.log(req.user._id);
    console.log(req.user._id);
    const bookings = await Booking.find({ userId: req.user._id }).populate('carId');
    res.json(bookings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
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
