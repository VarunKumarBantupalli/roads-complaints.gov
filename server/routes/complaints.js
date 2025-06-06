const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const Complaint = require('../models/Complaint');
const ComplaintResponse = require('../models/ComplaintResponse');     

// POST /api/complaints
router.post('/', (req, res) => {
  const complaintData = req.body;
  console.log('Received complaint data:', complaintData);
  // Save to DB logic goes here

  
  res.status(201).json({ message: 'Complaint received', data: complaintData });
});


// POST /api/complaints
router.post('/', verifyToken, async (req, res) => {
  const { image, location, description, district } = req.body;
  const userId = req.userId;

  const newComplaint = new Complaint({ userId, image, location, description, district });
  await newComplaint.save();
  res.status(201).json({ message: 'Complaint submitted successfully' });
});



// GET /api/complaints/district/:district
router.get('/district/:district', verifyToken, async (req, res) => {
  const { district } = req.params;
  const complaints = await Complaint.find({ district });
  res.status(200).json(complaints);
});




// POST /api/responses
router.post('/', verifyToken, async (req, res) => {
  const { complaintId, image, description } = req.body;
  const officerId = req.userId;

  const newResponse = new ComplaintResponse({ complaintId, officerId, image, description });
  await newResponse.save();
  res.status(201).json({ message: 'Response submitted successfully' });
});

// GET /api/responses/populated
router.get('/populated', async (req, res) => {
  const responses = await ComplaintResponse.find()
    .populate('complaintId')
    .populate('officerId');
  res.status(200).json(responses);
});




module.exports = router;
