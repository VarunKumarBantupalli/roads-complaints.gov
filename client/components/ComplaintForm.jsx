// src/components/ComplaintForm.jsx

import React, { useState} from 'react';
import axios from 'axios';;
import { Camera, LocateFixed, MapPin, Image as ImageIcon, Send } from "lucide-react";

const user = JSON.parse(localStorage.getItem("user"));

const ComplaintForm = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState('');
  const [district, setDistrict] = useState('');
  const [location, setLocation] = useState({ latitude: '', longitude: '' });
   const formRef = React.useRef(null);




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
     <div className="p-4 flex justify-center items-center min-h-screen bg-gradient-to-r from-[#f4f6f9] to-[#e0e7ff]">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-6 bg-white shadow-xl rounded-2xl space-y-5 transition-all duration-300"
      >
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Camera className="w-6 h-6 text-blue-600" /> Raise a Complaint
        </h2>

        {/* Camera-enabled input */}
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <ImageIcon className="w-5 h-5" /> Upload Image:
        </label>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageUpload}
          className="block w-full p-2 border border-gray-300 rounded-md text-sm file:mr-4 file:py-1 file:px-3 file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          required
        />

        {/* Image Preview */}
        {imagePreview && (
          <div>
            <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <textarea
          placeholder="Describe your issue"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <div className="relative">
          <MapPin className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="District"
            className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            required
          />
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Latitude"
            className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={location.latitude}
            onChange={(e) => setLocation({ ...location, latitude: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Longitude"
            className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={location.longitude}
            onChange={(e) => setLocation({ ...location, longitude: e.target.value })}
            required
          />
        </div>

        <button
          type="button"
          onClick={handleGetLocation}
          className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md transition-all duration-300"
        >
          <LocateFixed className="w-5 h-5" /> Get Current Location
        </button>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md font-medium transition-all duration-300"
        >
          <Send className="w-5 h-5" /> Submit Complaint
        </button>
      </form>
    </div>
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
