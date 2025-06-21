import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { User, MessageSquareReply, MapPin, Copy } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const OfficerDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();
  const district = localStorage.getItem('district');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get(
          `https://ridewise.onrender.com/api/complaints/district/${district}`,
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
    toast.success('Redirecting to respond...');
    navigate(`/respond/${complaintId}`);
  };

  const handleCopyCoordinates = (latitude, longitude) => {
    const coords = `Latitude: ${latitude}, Longitude: ${longitude}`;
    navigator.clipboard.writeText(coords)
      .then(() => toast.success('Coordinates copied!'))
      .catch(() => toast.error('Failed to copy coordinates.'));
  };

  useEffect(() => {
    toast.success(`Loaded complaints from ${district}`);
  }, [district]);

  return (
    <>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="p-4 min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0]">
        <div className='w-full bg-slate-300'>
                  <h2 className="text-3xl font-semibold text-gray-900  mb-6">
           <span className="text-purple-600">{district} </span> Officer Dashboard
        </h2>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map((complaint, index) => (
            <motion.div
              key={complaint._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-5 border border-gray-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <User className="w-4 h-4 text-purple-500" />
                <span className="font-medium">From:</span> {complaint.userId?.name || 'Anonymous'}
              </div>

              <img
                src={complaint.image}
                alt="Complaint"
                className="w-full h-48 object-cover rounded-lg mb-4 border border-gray-200"
              />

              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span className="font-medium">District:</span> {complaint.district}
              </div>

              <p className="text-gray-800 text-[15px] font-medium mb-3 leading-snug">
                {complaint.description}
              </p>

              <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 mb-4 border">
                <p><span className="font-semibold text-gray-800">Latitude:</span> {complaint.location.latitude}</p>
                <p><span className="font-semibold text-gray-800">Longitude:</span> {complaint.location.longitude}</p>
                                <button 
                  onClick={() =>
                    handleCopyCoordinates(
                      complaint.location.latitude,
                      complaint.location.longitude
                    )
                  }
                  className="flex my-2 items-center justify-center gap-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded-lg transition font-medium"
                >
                  <Copy className="w-4 h-4" />
                  Copy Coordinates
                </button>
              </div>

              <div className="flex flex-col gap-2">


                <a
                  href={`https://www.google.com/maps?q=${complaint.location.latitude},${complaint.location.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-sm bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-2 rounded-lg transition font-semibold"
                >
                  <MapPin className="w-4 h-4" />
                  View on Map
                </a>

                <button
                  onClick={() => handleView(complaint._id)}
                  className="flex items-center justify-center gap-2 cursor-pointer transition-all text-sm bg-black text-white px-4 py-2 rounded-lg font-medium hover:text-black hover:bg-white hover:border hover:border-black shadow-md hover:shadow-lg"
                >
                  <MessageSquareReply className="w-4 h-4" />
                  Respond
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OfficerDashboard;
