const express = require('express');
const router = express.Router();
const ComplaintResponse = require('../models/complaintResponse');

// GET /api/responses
router.get('/', async (req, res) => {
  try {
    const responses = await ComplaintResponse.find()
      .populate('complaintId')  
       .populate('officerId', 'name email district'); 

    res.status(200).json(responses);
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({ message: 'Failed to fetch responses' });
  }
});

module.exports = router;
