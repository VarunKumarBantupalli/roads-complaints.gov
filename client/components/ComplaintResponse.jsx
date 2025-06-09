import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ComplaintResponse = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/complaints/${id}`);
        if (!res.data) {
          console.warn('No complaint found with this ID');
          return;
        }
        setComplaint(res.data);
      } catch (err) {
        console.error('Error fetching complaint:', err);
      }
    };

    fetchComplaint();
  }, [id]);



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

      const storedUser = JSON.parse(localStorage.getItem('user'));
    const officerId = storedUser?._id;

  const handleResponseSubmit = async () => {
    if (!image || !description) {
      alert('Please upload an image and provide a description');
      return;
    }

    try {
      await axios.post(`http://localhost:3000/api/complaints/respond/${id}`, {
        image,
        description,
        officerId
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // If using JWT auth
        }
      });

      alert('Response submitted successfully!');
      setImage(null);
      setDescription('');
    } catch (err) {
      console.error('Error submitting response:', err);
    }
  };

  if (!complaint) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Complaint Details</h2>
      <img src={complaint.image} alt="Complaint" className="w-full h-64 object-cover rounded mb-4" />
      <p><strong>Description:</strong> {complaint.description}</p>

      <h2 className="text-xl font-bold mt-6 mb-4">Attach Officer's Response</h2>
      <input type="file" onChange={handleImageUpload} className="mb-4" />
      <textarea
        placeholder="Response Description"
        className="w-full p-2 border rounded mb-4"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-green-600 text-white rounded"
        onClick={handleResponseSubmit}
      >
        Submit Response
      </button>
    </div>
  );
};

export default ComplaintResponse;
