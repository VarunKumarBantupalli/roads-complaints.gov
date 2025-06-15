const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const Complaint = require('../models/complaint');
const ComplaintResponse = require("../models/complaintResponse");



// // POST /api/complaints
// // This route is used to submit and handle a new complaint
router.post('/', async (req, res) => {
  try {
    const { image, location, description, district, userId } = req.body;
    const newComplaint = new Complaint({ userId, image, location, description, district });
    const savedComplaint = await newComplaint.save();
    res.status(201).json({
      message: 'Complaint submitted successfully',
      data: savedComplaint
    });
  } catch (error) {
    console.error('Error saving complaint:', error);
    res.status(500).json({ error: 'Failed to save complaint' });
  }
});

// GET /api/complaints/district/:district
router.get('/district/:district', async (req, res) => {
  try {
    const { district } = req.params;

    const complaints = await Complaint.find({
      district: new RegExp(`^${district}$`, 'i'),
    });

    if (!complaints || complaints.length === 0) {
      return res.status(404).json({ message: 'No complaints found for this district' });
    }

    res.status(200).json(complaints);
  } catch (error) {
    console.error('Error fetching complaints for district:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/complaints
// This route is used to get all complaints
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('userId', 'name email');
    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch complaints', error: err });
  }
}
);

// GET /api/complaints/:id
//This route is used to get a specific complaint that the officer wanting to respond 
router.get('/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/complaints/respond/:id
// This route is used by officers to respond to a complaint
router.post('/respond/:id', async (req, res) => {
  const complaintId = req.params.id;
  const { image, description, officerId } = req.body;

  try {
    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    const newResponse = new ComplaintResponse({
      complaintId,
      complaintImage: complaint.image,
      complaintDescription: complaint.description,
      image,
      description,
      officerId,
    });

    await newResponse.save();
    await Complaint.findByIdAndDelete(complaintId);

    res.status(200).json({ message: 'Response submitted successfully' });
  } catch (err) {
    console.error('Error submitting response:', err);
    res.status(500).json({ message: 'Server error' });
  }
});




// POST /api/responses
// router.post('/',  async (req, res) => {
//   const { complaintId, image, description } = req.body;
//   const officerId = req.userId;

//   const newResponse = new ComplaintResponse({ complaintId, officerId, image, description });
//   await newResponse.save();
//   res.status(201).json({ message: 'Response submitted successfullyrerr' });
// });





module.exports = router;
