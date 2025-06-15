import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const OfficerDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();
  const district = localStorage.getItem('district');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        
        const res = await axios.get(`https://ridewise.onrender.com/api/complaints/district/${district}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }

        );
     
        if (!res.data || res.data.length === 0) {
          console.warn('No complaints found for this district');
        }
        
        setComplaints(res.data);
      } catch (error) {
        console.error('Error fetching complaints:', error); 
      }
    };

    fetchComplaints();
  }, [district]);

  const handleView = (complaintId) => {
    navigate(`/respond/${complaintId}`);
  };


  return (
    <div className="p-4">
       
        <button className="bg-red-500 text-white px-4 py-2 rounded">
                <Link to="/logout">Logout</Link>
            </button>


      <h2 className="text-xl font-bold mb-4">Complaints from {district}</h2>
      {complaints.map(complaint => (

        <div key={complaint._id} className="border p-4 mb-4 rounded shadow bg-amber-600">
          <h4>From: {complaint.userId?.name || 'Anonymous'}</h4>
          <img
            src={complaint.image}
            alt="Complaint"
            className="w-full h-48 object-cover mb-2 rounded"/>
          {/* <p className="text-sm text-gray-700">Location: {complaint.location}</p> */}
          <p className="text-sm text-gray-700">District: {complaint.district}</p>
          <p>{complaint.description}</p>
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => handleView(complaint._id)}
          >
            Respond
          </button>
        </div>
      ))}
    </div>
  );
};

export default OfficerDashboard;
