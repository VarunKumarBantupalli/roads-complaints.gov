// src/components/ComplaintForm.jsx

import React, { useState } from 'react';
import axios from 'axios';
const user = JSON.parse(localStorage.getItem("user"));

const ComplaintForm = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState('');
  const [district, setDistrict] = useState('');
  const [location, setLocation] = useState({ latitude: '', longitude: '' });

  


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file)); 

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

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        });
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to retrieve location');
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userId = storedUser?._id;

    try {
      await axios.post(
       
        `https://ridewise.onrender.com/api/complaints`,
        {
          image,
          description,
          district,
          location,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Complaint submitted!');
      setImage('');
      setImagePreview('');
      setDescription('');
      setDistrict('');
      setLocation({ latitude: '', longitude: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to submit complaint');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Raise a Complaint</h2>

      {/* Camera-enabled input */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImageUpload}
        className="mb-4"
        required
      />

      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-auto rounded border"
          />
        </div>
      )}

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

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Latitude"
          className="w-1/2 p-2 border rounded"
          value={location.latitude}
          onChange={(e) => setLocation({ ...location, latitude: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Longitude"
          className="w-1/2 p-2 border rounded"
          value={location.longitude}
          onChange={(e) => setLocation({ ...location, longitude: e.target.value })}
          required
        />
      </div>

      <button
        type="button"
        onClick={handleGetLocation}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Get Current Location
      </button>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default ComplaintForm;



// src/components/ComplaintForm.jsx
//this is the code which auto fetches the district of the user

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ComplaintForm = () => {
//   const [image, setImage] = useState(null);
//   const [description, setDescription] = useState('');
//   const [district, setDistrict] = useState('');
//   const [location, setLocation] = useState({ latitude: '', longitude: '' });

//   // Handle image from file or camera
//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', 'user_uploads');

//     try {
//       const res = await axios.post(
//         'https://api.cloudinary.com/v1_1/varuncloudinarycloud/image/upload',
//         formData
//       );
//       setImage(res.data.secure_url);
//     } catch (err) {
//       console.error('Upload failed:', err);
//     }
//   };

//   // Get district from coordinates using Nominatim
//   const getDistrictFromCoords = async (lat, lon) => {
//     try {
//       const res = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
//       );
//       const data = await res.json();
//       const dist = data?.address?.county || data?.address?.state_district || '';
//       return dist;
//     } catch (err) {
//       console.error('Error during reverse geocoding:', err);
//       return '';
//     }
//   };

//   // Auto-fetch location and district on mount
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         setLocation({ latitude, longitude });

//         const autoDistrict = await getDistrictFromCoords(latitude, longitude);
//         setDistrict(autoDistrict);
//       },
//       (error) => {
//         console.error("Geolocation error:", error);
//       }
//     );
//   }, []);

//   // Submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem('token');
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     const userId = storedUser?._id;

//     try {
//       await axios.post(
//         'VITE_API_BASE_URL/api/complaints',
//         {
//           image,
//           description,
//           district,
//           location,
//           userId
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       alert('Complaint submitted!');
//       setImage('');
//       setDescription('');
//       setDistrict('');
//       setLocation({ latitude: '', longitude: '' });
//     } catch (err) {
//       console.error(err);
//       alert('Failed to submit complaint');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
//       <h2 className="text-xl font-bold mb-4">Raise a Complaint</h2>

//       {/* Capture via file/camera */}
//       <input
//         type="file"
//         accept="image/*"
//         capture="environment"
//         onChange={handleImageUpload}
//         className="mb-4"
//         required
//       />

//       <textarea
//         placeholder="Description"
//         className="w-full p-2 border rounded mb-4"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         required
//       />

//       <input
//         type="text"
//         placeholder="District"
//         className="w-full p-2 border rounded mb-4"
//         value={district}
//         readOnly
//         required
//       />

//       <input
//         type="text"
//         placeholder="Latitude"
//         className="w-full p-2 border rounded mb-4"
//         value={location.latitude}
//         readOnly
//         required
//       />

//       <input
//         type="text"
//         placeholder="Longitude"
//         className="w-full p-2 border rounded mb-4"
//         value={location.longitude}
//         readOnly
//         required
//       />

//       <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//         Submit
//       </button>
//     </form>
//   );
// };

// export default ComplaintForm;
