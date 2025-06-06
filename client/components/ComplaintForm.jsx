// src/components/ComplaintForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

const ComplaintForm = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [district, setDistrict] = useState('');
  const [location, setLocation] = useState({ latitude: '', longitude: '' });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'user_uploads'); 

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/varuncloudinarycloud/image/upload', 
        formData
      );
      setImage(res.data.secure_url);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      await axios.post(
        'http://localhost:3000/api/complaints',
        {
          image,
          description,
          district,
          location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Complaint submitted!');
      setImage('');
      setDescription('');
      setDistrict('');
    } catch (err) {
      console.error(err);
      alert('Failed to submit complaint');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Raise a Complaint</h2>

      <input type="file" onChange={handleImageUpload} className="mb-4" required />
      <textarea
        placeholder="Description"
        className="w-full p-2 border rounded mb-4"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="District"
        className="w-full p-2 border rounded mb-4"
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Latitude"
        className="w-full p-2 border rounded mb-4"
        value={location.latitude}
        onChange={(e) => setLocation({ ...location, latitude: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Longitude"
        className="w-full p-2 border rounded mb-4"
        value={location.longitude}
        onChange={(e) => setLocation({ ...location, longitude: e.target.value })}
        required
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default ComplaintForm;
