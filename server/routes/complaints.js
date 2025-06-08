const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const Complaint = require('../models/Complaint');
const ComplaintResponse = require('../models/ComplaintResponse');     

// POST /api/complaints
router.post('/', async (req, res) => {
   const complaintData = {
      ...req.body,
      
    };

  try {
    console.log('Received complaint data:', complaintData);

    // Create and save new complaint
    const newComplaint = new Complaint(complaintData);
    const savedComplaint = await newComplaint.save();

    res.status(201).json({
      message: 'Complaint received and saved successfully',
      data: savedComplaint,
    });

  } catch (error) {
    console.error('Error saving complaint:', error);
    res.status(500).json({ error: 'Failed to save complaint' });
  }
});

// POST /api/complaints
router.post('/', verifyToken, async (req, res) => {
  const { image, location, description, district } = req.body;
  const userId = req.body.userId;

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
