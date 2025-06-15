import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await axios.get(`https://ridewise.onrender.com/api/responses`);
        setResponses(res.data);
      } catch (err) {
        console.error('Error fetching responses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading responses...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">All Complaint Responses</h1>

      {responses.length === 0 ? (
        <p>No responses yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {responses.map((res) => (
            <div key={res._id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Complaint</h2>
              <img src={res.complaintImage} alt="Complaint" className="w-full h-48 object-cover rounded mb-2" />
              <p><strong>Description:</strong> {res.complaintDescription}</p>

              <h2 className="text-xl font-semibold mt-4">Response</h2>
              <img src={res.image} alt="Response" className="w-full h-48 object-cover rounded mb-2" />
              <p><strong>Response Description:</strong> {res.description}</p>

              {res.officerId && (
                <p className="text-sm text-gray-500 mt-2">
                  Responded by: {res.officerId.name} ({res.officerId.email})
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
