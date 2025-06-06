// src/components/ComplaintResponse.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ComplaintResponse = () => {
  const [complaints, setComplaints] = useState([]);
  const [responseMap, setResponseMap] = useState({});
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const district = localStorage.getItem('district');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/complaints/district/${district}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setComplaints(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [district, token]);

  const handleResponseSubmit = async (complaintId) => {
    try {
      await axios.post(
        'http://localhost:3000/api/responses',
        {
          complaintId,
          description: responseMap[complaintId]?.description,
          image: responseMap[complaintId]?.image,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Response submitted!');
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = async (e, complaintId) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'user_uploads'); // Replace with your Cloudinary upload preset

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/varuncloudinarycloud/image/upload',
        formData
      );
      setResponseMap((prev) => ({
        ...prev,
        [complaintId]: {
          ...prev[complaintId],
          image: res.data.secure_url,
        },
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e, complaintId) => {
    const { value } = e.target;
    setResponseMap((prev) => ({
      ...prev,
      [complaintId]: {
        ...prev[complaintId],
        description: value,
      },
    }));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">District Complaints</h1>

      {loading ? (
        <p className="text-center">Loading complaints...</p>
      ) : complaints.length === 0 ? (
        <p className="text-center text-gray-600">No complaints found for your district.</p>
      ) : (
        <div className="grid gap-6">
          {complaints.map((comp) => (
            <div
              key={comp._id}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Complaint Description</h2>
                <p className="text-gray-700 mt-1">{comp.description}</p>
              </div>

              {comp.image && (
                <img
                  src={comp.image}
                  alt="Complaint"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              )}

              <div className="space-y-3">
                <input
                  type="file"
                  onChange={(e) => handleImageUpload(e, comp._id)}
                  className="w-full border p-2 rounded"
                />

                <textarea
                  placeholder="Type your response here..."
                  className="w-full border p-3 rounded h-32"
                  value={responseMap[comp._id]?.description || ''}
                  onChange={(e) => handleInputChange(e, comp._id)}
                />

                <button
                  onClick={() => handleResponseSubmit(comp._id)}
                  className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700"
                >
                  Submit Response
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComplaintResponse;

