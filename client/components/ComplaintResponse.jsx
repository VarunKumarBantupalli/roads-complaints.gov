import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';
import { UploadCloud, FileCheck } from "lucide-react";

const ComplaintResponse = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await axios.get(`https://ridewise.onrender.com/api/complaints/${id}`);
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

    setImagePreview(URL.createObjectURL(file)); // Show image preview

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
      await axios.post(
        `https://ridewise.onrender.com/api/complaints/respond/${id}`,
        {
          image,
          description,
          officerId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        }
      );

      alert('Response submitted successfully!');
      setImage(null);
      setImagePreview(null);
      setDescription('');
    } catch (err) {
      console.error('Error submitting response:', err);
    }
  };

  if (!complaint) return <div>
    <Loading />
  </div>;

  return (
       <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-6 mb-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Complaint Details</h2>

      <img
        src={complaint.image}
        alt="Complaint"
        className="w-full h-64 object-cover rounded-xl mb-6 shadow-sm"
      />

      <p className="text-gray-700 mb-6">
        <strong className="font-medium">Description:</strong> {complaint.description}
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mb-3">Attach Officer's Response</h2>

      {/* Upload Input */}
      <label className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-800 transition mb-4">
        <UploadCloud className="w-5 h-5" />
        <span className="underline">Capture/Upload Image</span>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageUpload}
          className="hidden"
        />
      </label>

      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
          <img
            src={imagePreview}
            alt="Response Preview"
            className="w-full max-h-80 object-cover rounded-lg border border-gray-200 shadow"
          />
        </div>
      )}

      <textarea
        placeholder="Write response description here..."
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none resize-none mb-6"
        rows={5}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <button
        className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition duration-300 shadow-sm w-full sm:w-fit"
        onClick={handleResponseSubmit}
      >
        <FileCheck className="w-5 h-5" />
        Submit Response
      </button>
    </div>
  );
};

export default ComplaintResponse;
