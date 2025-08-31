const express = require('express');
const router = express.Router();
const Car = require('../models/Car.model');
const {verifyToken} = require("../utils/auth");

// Create Car
router.post('/', verifyToken, async (req, res) => {
  try {
    console.log(req.user);
    let car = new Car({ ...req.body, userId: req.user._id })
    car = await car.save();
    res.status(201).json(car);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

// Get All Cars
router.get('/', async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

// Get Car by ID
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.sendStatus(404);
    res.json(car);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update Car
router.put('/:id', async (req, res) => {
  try {
    const updated = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Car
router.delete('/:id', async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
