// src/pages/Responses.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import {
  User,
  ShieldCheck,
  MapPin,
  Clock4,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const districts = [
  'anakapalli', 'anantapur', 'bapatla', 'chittoor', 'eastgodavari', 'eluru', 'guntur',
  'kakinada', 'konaseema', 'krishna', 'kurnool', 'nandyal', 'nellore', 'ntr',
  'palnadu', 'parvathipurammanyam', 'prakasam', 'srisathyasai', 'srikakulam', 'tirupati',
  'visakhapatnam', 'vizianagaram', 'westgodavari', 'ysrkadapa', 'allurisitaramaraju',
  'drbrambedkarkoneru'
];


const Responses = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const responsesPerPage = 4;

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  // Reset page to 1 on filter/sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDistrict, sortOrder]);

  const filteredResponses = responses
    .filter((res) => {
      if (!selectedDistrict) return true;
      return res.officerId?.district?.toLowerCase() === selectedDistrict.toLowerCase();
    })
    .sort((a, b) =>
      sortOrder === 'newest'
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

  const indexOfLast = currentPage * responsesPerPage;
  const indexOfFirst = indexOfLast - responsesPerPage;
  const currentResponses = filteredResponses.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredResponses.length / responsesPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (loading) return <Loading />;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-zinc-100 to-stone-200 px-4 py-8">
        <h1 className="text-3xl font-bold mb-10 text-center text-zinc-800">Public Complaint Responses</h1>

        {/* Sort Dropdown */}
        <div className="flex flex-col md:flex-row justify-center md:justify-end items-center gap-4 mb-10 px-4">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-3 rounded-lg border border-stone-400 bg-white shadow-md w-full md:w-[48%] lg:w-[25%] text-gray-700"
          >
            <option value="newest">Sort by Newest</option>
            <option value="oldest">Sort by Oldest</option>
          </select>
        </div>

        {/* Response Cards */}
        {currentResponses.length === 0 ? (
          <p className="text-center text-stone-600">No responses found.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 px-4">
            {currentResponses.map((res) => (
              <div
                key={res._id}
                className="bg-gradient-to-b from-zinc-200 to-stone-400 rounded-2xl overflow-hidden shadow-xl transition-transform hover:scale-[1.01] border border-zinc-300"
              >
                {/* Complaint */}
                <div className="p-5 border-b border-zinc-200">
                  <h2 className="text-lg font-semibold text-zinc-800 mb-4">🛠 Complaint</h2>
                  <div className="relative h-56 mb-4 rounded-lg overflow-hidden">
                    <img src={res.complaintImage} alt="Complaint" className="object-cover w-full h-full" />
                    <div className="absolute inset-0  bg-opacity-90 z-10" />
                    <span className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs font-semibold px-2 py-1 rounded z-20">
                      Before
                    </span>
                  </div>
                  <p className="mb-2 text-stone-700"><strong>Description:</strong> {res.complaintDescription}</p>
                  <p className="text-sm text-stone-500 flex items-center gap-2">
                    <Clock4 className="w-4 h-4" /> Submitted on: <strong>{formatDate(res.createdAt)}</strong>
                  </p>
                </div>

                {/* Response */}
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-zinc-800 mb-4">✅ Response</h2>
                  <div className="relative h-56 mb-4 rounded-lg overflow-hidden">
                    <img src={res.image} alt="Response" className="object-cover w-full h-full" />
                    <div className="absolute inset-0  bg-opacity-20 z-10" />
                    <span className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs font-semibold px-2 py-1 rounded z-20">
                      After
                    </span>
                  </div>
                  <p className="mb-2 text-stone-700"><strong>Response:</strong> {res.description}</p>
                  <p className="text-sm text-stone-500 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-stone-600" /> Officer: <strong>{res.officerId?.name || 'Unknown'}</strong> ({res.officerId?.email})
                  </p>
                  <p className="text-sm text-stone-500 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-stone-600" /> District: <strong>{res.officerId?.district || 'N/A'}</strong>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center gap-2 flex-wrap">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 bg-white border rounded-lg shadow-sm hover:bg-stone-100 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 border rounded-lg shadow-sm ${
                  currentPage === i + 1 ? 'bg-zinc-800 text-white' : 'bg-white hover:bg-stone-100'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 bg-white border rounded-lg shadow-sm hover:bg-stone-100 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Responses;
