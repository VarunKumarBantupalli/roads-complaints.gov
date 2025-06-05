const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ msg: 'User already exists' });

  const newUser = new User({ name, email, password, role: 'user' });
  await newUser.save();
  res.status(201).json({ msg: 'User registered' });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.password !== password)
    return res.status(401).json({ msg: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, role: user.role }, 'secretkey', {
    expiresIn: '1d'
  });

  res.json({ token, role: user.role });
});

module.exports = router;
