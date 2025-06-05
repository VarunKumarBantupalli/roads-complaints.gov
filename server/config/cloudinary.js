const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// console.log( "CLOUDINARY_CLOUD_NAME :" , process.env.CLOUDINARY_CLOUD_NAME);
// console.log( "CLOUDINARY_API_KEY :" , process.env.CLOUDINARY_CLOUD_NAME);
// console.log( "CLOUDINARY_API_SECRET :" , process.env.CLOUDINARY_API_SECRET);

console.log('Cloudinary configured successfully');

module.exports = cloudinary;
