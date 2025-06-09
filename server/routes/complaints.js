const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const Complaint = require('../models/complaint');
const ComplaintResponse = require('../models/ComplaintResponse');
 
// // POST /api/complaints
// // This route is used to submit a new complaint

// router.post('/', verifyToken, async (req, res) => {
//   const { image, location, description, district } = req.body;
//   const userId = req.body.userId;

//   const newComplaint = new Complaint({ userId, image, location, description, district });
//   await newComplaint.save();
//   res.status(201).json({ message: 'Complaint submitted successfully' });
// });

// // POST /api/complaints
// // that submitted complaint are handled and saved to the database 

// router.post('/', async (req, res) => {
//    const complaintData = {
//       ...req.body,    
//     };
//   try { 
//     const newComplaint = new Complaint(complaintData);
//     const savedComplaint = await newComplaint.save();
//     res.status(201).json({
//       message: 'Complaint received and saved successfully',
//       data: savedComplaint,
//     });

//   } catch (error) {
//     console.error('Error saving complaint:', error);
//     res.status(500).json({ error: 'Failed to save complaint' });
//   }
// });

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

    const complaints = await Complaint.find({ district });

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

module.exports = router;
