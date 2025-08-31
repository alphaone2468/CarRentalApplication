const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const bcrypt=require("bcrypt");
const { generateToken,verifyToken } = require('../utils/auth');



router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({status:"FAILED", message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let user = new User({ name, email, password: hashedPassword });
    user = await user.save();
    console.log(user);
    res.status(201).json({ status: "SUCCESS", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "FAILED", message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password);
    const user = await User.findOne({ email }).lean();
    if (!user) {
      return res.status(400).json({ status: "FAILED", message: 'Invalid email or password' });
    }
    console.log(user);
    console.log(await bcrypt.hash(password, 10));
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({ status: "FAILED", message: 'Invalid email or password' });
    }
    delete user.password;
    const token = generateToken(user);
    console.log(token);
    
    res.cookie("access_token",token,{
      httpOnly: true,
      sameSite: 'strict'
    })
    res.json({ status: "SUCCESS", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "FAILED", message: 'Server error' });
  }
});

router.get("/loggedIn",verifyToken,(req,res)=>{
  res.json({ status: "SUCCESS", user: req.user });
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
