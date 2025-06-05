const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'complaints',
    allowed_formats: ['jpg', 'png', 'jpeg']
  }
});

const parser = multer({ storage: storage });

// POST route to upload image
router.post('/upload', parser.single('image'), (req, res) => {
  res.status(200).json({ imageUrl: req.file.path });
});

module.exports = router;
