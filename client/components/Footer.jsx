import React from 'react';
import { Phone, Mail, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Contact Section */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
          <div className="space-y-3">
            <a href="tel:+917569594275" className="flex items-center hover:text-blue-400 transition">
              <Phone className="w-5 h-5 mr-2" /> +91 8919428334
            </a>
            <a href="mailto:ridewise.support@gmail.com" className="flex items-center hover:text-red-400 transition">
              <Mail className="w-5 h-5 mr-2" /> ridewise.support@gmail.com
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-blue-300 transition">Home</Link>
            </li>
            <li>
              <Link to="/user-dashboard" className="hover:text-blue-300 transition">Submit Complaint</Link>
            </li>
            <li>
              <Link to="/responses" className="hover:text-blue-300 transition">Complaint Responses</Link>
            </li>
          </ul>
        </div>

        {/* Social Media & Branding */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Follow Us</h2>
          <div className="flex space-x-4 mb-6">
            <a href="https://www.instagram.com/varun_bantupalli" target="_blank" rel="noreferrer" className="hover:text-pink-500 transition">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/varunkumarbantupalli" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
          <h3 className="text-3xl font-extrabold text-white tracking-tight">Ridewise</h3>
          <p className="text-sm text-gray-400 mt-2">Smart reporting for better roads.</p>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Ridewise. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
