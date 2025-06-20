import React from 'react';
import { Megaphone, CheckCircle, Users } from 'lucide-react';

const stats = [
  {
    icon: <Megaphone className="w-10 h-10 text-white" />,
    label: 'Complaints Raised',
    value: '850+',
    description: 'Total number of complaints raised by citizens across regions.',
  },
  {
    icon: <CheckCircle className="w-10 h-10 text-white" />,
    label: 'Responses Posted',
    value: '620+',
    description: 'Issues addressed and resolved by officials promptly.',
  },
  {
    icon: <Users className="w-10 h-10 text-white" />,
    label: 'Active Users',
    value: '1.2K+',
    description: 'Citizens regularly participating to improve local infrastructure.',
  },
];

const Numbers = () => {
  return (
    <section className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-20 px-4 sm:px-6 lg:px-16">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ridewise in Numbers
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          A quick look at how Ridewise is transforming road grievance redressal across cities.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700 text-left hover:shadow-xl transition duration-300"
          >
            <div className="mb-4 flex items-center justify-center bg-blue-600 rounded-full w-16 h-16 mx-auto">
              {item.icon}
            </div>

            <h3 className="text-3xl font-bold text-center text-white">{item.value}</h3>
            <p className="text-lg font-semibold text-center mt-2 text-gray-200">{item.label}</p>
            <p className="text-sm text-gray-400 mt-3 text-center">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Numbers;
