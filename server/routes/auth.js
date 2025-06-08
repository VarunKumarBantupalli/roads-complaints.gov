const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({
      name,
      email,
      password,
      role: 'user', 
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
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

  res.json({ token,
  role: user.role,
    user: {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    
  },
  district: user.role === 'officer' ? user.district : null,});
});


//logout 
router.post('/logout', (req, res) => {
  // Invalidate the token on the client side
  
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
