import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
import { motion } from 'framer-motion';
import { User, MessageSquareReply, MapPin } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';


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

    useEffect(() => {
    toast.success(`Loaded complaints from ${district}`);
  }, [district]);


  return (
 <>
      
      <Toaster position="top-right" reverseOrder={false} />
      <div className="p-4 min-h-screen bg-gradient-to-b from-[#f5f7fa] to-[#d9e2ec]">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Complaints from <span className="text-blue-600">{district}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map((complaint, index) => (
            <motion.div
              key={complaint._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                <User className="w-4 h-4 text-blue-600" />
                From: {complaint.userId?.name || 'Anonymous'}
              </div>

              <img
                src={complaint.image}
                alt="Complaint"
                className="w-full h-48 object-cover rounded-md mb-3 border border-gray-200"
              />

              <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                <MapPin className="w-4 h-4 text-green-600" />
                District: {complaint.district}
              </div>

              <p className="text-gray-800 text-sm mb-4">{complaint.description}</p>

              <button
                onClick={() => {
                  toast.success('Redirecting to respond...');
                  handleView(complaint._id);
                }}
                className="flex items-center gap-2 w-full justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
              >
                <MessageSquareReply className="w-4 h-4" />
                Respond
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OfficerDashboard;
