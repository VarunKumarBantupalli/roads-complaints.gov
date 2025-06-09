import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ComplaintResponse = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [responseText, setResponseText] = useState('');

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/complaints/${id}`);
        setComplaint(res.data);
      } catch (err) {
        console.error('Error fetching complaint:', err);
      }
    };

    fetchComplaint();
  }, [id]);

  const handleResponseSubmit = async () => {
    try {
      await axios.post(`http://localhost:3000/api/complaints/respond/${id}`, {
        response: responseText,
        status: 'resolved',
      });
      alert('Response submitted successfully!');
    } catch (err) {
      console.error('Error submitting response:', err);
    }
  };

  if (!complaint) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Complaint Details</h2>
      <p><strong>Title:</strong> {complaint.title}</p>
      <p><strong>Description:</strong> {complaint.description}</p>

      <textarea
        className="w-full p-2 border rounded mt-4"
        rows={4}
        placeholder="Type your response here..."
        value={responseText}
        onChange={(e) => setResponseText(e.target.value)}
      />

      <button
        className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
        onClick={handleResponseSubmit}
      >
        Submit Response
      </button>
    </div>
  );
};

export default ComplaintResponse;
