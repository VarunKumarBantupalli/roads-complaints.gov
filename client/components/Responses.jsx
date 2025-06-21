import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
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
  const responsesPerPage = 6;

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

  const filteredResponses = responses
    .filter((res) => {
      if (!selectedDistrict) return true;
      return res.officerId?.district?.toLowerCase() === selectedDistrict.toLowerCase();
    })
    .sort((a, b) => {
      return sortOrder === 'newest'
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    });

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
    <Navbar/>
      <div className="min-h-screen bg-gradient-to-b from-[#f9fafb] to-[#e6efff] px-4 py-6">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Public Complaint Responses</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 shadow-sm w-full md:w-1/2 lg:w-1/3"
          >
            <option value="">Filter by District</option>
            {districts.map((district, index) => (
              <option key={index} value={district}>
                {district.charAt(0).toUpperCase() + district.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 shadow-sm w-full md:w-1/3 lg:w-1/4"
          >
            <option value="newest">Sort by Newest</option>
            <option value="oldest">Sort by Oldest</option>
          </select>
        </div>

        {/* Responses */}
        {currentResponses.length === 0 ? (
          <p className="text-center text-gray-600">No responses found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {currentResponses.map((res) => (
              <div key={res._id} className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl">

                {/* Complaint Section */}
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">Complaint Details</h2>
                  <img
                    src={res.complaintImage}
                    alt="Complaint"
                    className="w-full h-52 object-cover rounded-lg mb-3 border"
                  />
                  <p className="mb-2 text-gray-700"><strong>Description:</strong> {res.complaintDescription}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" /> Filed by: <strong>{res.userId?.name || 'Unknown'}</strong>
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Clock4 className="w-4 h-4 text-gray-500" /> Submitted on: <strong>{formatDate(res.createdAt)}</strong>
                  </p>
                </div>

                {/* Response Section */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">Response Summary</h2>
                  <img
                    src={res.image}
                    alt="Response"
                    className="w-full h-52 object-cover rounded-lg mb-3 border"
                  />
                  <p className="mb-2 text-gray-700"><strong>Response:</strong> {res.description}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-600" /> Officer: <strong>{res.officerId?.name || 'Unknown'}</strong> ({res.officerId?.email})
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-600" /> District: <strong>{res.officerId?.district || 'N/A'}</strong>
                  </p>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              <ChevronLeft className="inline-block w-4 h-4" /> Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'} hover:bg-blue-500 hover:text-white`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next <ChevronRight className="inline-block w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Responses;
