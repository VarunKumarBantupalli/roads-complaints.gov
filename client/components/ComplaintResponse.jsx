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

  if (!complaint) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 mb-12 bg-gradient-to-br from-[#f9fafb] to-[#edf2f7] rounded-3xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6">Complaint Details</h2>

      <img
        src={complaint.image}
        alt="Complaint"
        className="w-full h-64 object-cover rounded-2xl mb-6 border border-gray-300 shadow-sm"
      />

      <p className="text-lg text-gray-800 mb-8 bg-white p-4 rounded-xl border border-gray-200 shadow-inner leading-relaxed">
        <span className="font-semibold text-gray-700 block mb-1">Description:</span>
        {complaint.description}
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-4">Attach Officer's Response</h3>

      <label className="flex items-center gap-2 text-indigo-600 cursor-pointer hover:text-indigo-800 transition font-medium mb-5">
        <UploadCloud className="w-5 h-5" />
        <span className="underline">Capture or Upload an Image</span>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageUpload}
          className="hidden"
        />
      </label>

      {imagePreview && (
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
          <img
            src={imagePreview}
            alt="Response Preview"
            className="w-full max-h-80 object-cover rounded-xl border border-gray-300 shadow-md"
          />
        </div>
      )}

      <textarea
        placeholder="Write your response here..."
        className="w-full p-4 text-gray-800 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none mb-6 text-[15px] leading-relaxed"
        rows={5}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <button
        className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition-all duration-300"
        onClick={handleResponseSubmit}
      >
        <FileCheck className="w-5 h-5" />
        Submit Response
      </button>
    </div>
  );
};

export default ComplaintResponse;
